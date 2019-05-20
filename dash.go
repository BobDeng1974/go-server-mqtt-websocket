package main

import (
	"context"
	"crypto/tls"
	"flag"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"time"

	MQTT "github.com/eclipse/paho.mqtt.golang"
	"github.com/gorilla/websocket"
	"github.com/husarlabs/iothub/common"
	"github.com/husarlabs/iothub/iotservice"
	"github.com/julienschmidt/httprouter"
)

var numberMsg = 0

///////////////////////////////////////
////// HUB

type hub struct {
	// Registered clients
	clients map[*client]bool

	// Inbound messages
	broadcast chan string

	// Register requests
	register chan *client

	// Unregister requests
	unregister chan *client

	content string
}

var h = hub{
	broadcast:  make(chan string),
	register:   make(chan *client),
	unregister: make(chan *client),
	clients:    make(map[*client]bool),
	content:    "",
}

func (h *hub) run() {
	//fmt.Println("On Hub Run")
	for {
		select {
		case c := <-h.register:
			//fmt.Println("On Hub Run Register")
			h.clients[c] = true
			c.send <- []byte(h.content)
			break

		case c := <-h.unregister:
			//fmt.Println("On Hub Run Unregister")
			_, ok := h.clients[c]
			if ok {
				delete(h.clients, c)
				close(c.send)
			}
			break

		case m := <-h.broadcast:
			//fmt.Println("On Hub Run boradcast")
			//fmt.Println(m)
			h.content = m
			h.broadcastMessage()
			break
		}
	}
}

func (h *hub) broadcastMessage() {
	//fmt.Println("In broadcastMessage")
	for c := range h.clients {
		select {
		case c.send <- []byte(h.content):
			break

		// We can't reach the client
		default:
			close(c.send)
			delete(h.clients, c)
		}
	}
}

////////////////////////////////////////
////// WEB SOCKET CLIENT
const (
	writeWait      = 8 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 1024 * 1024
)

type client struct {
	ws   *websocket.Conn
	send chan []byte // Channel storing outcoming messages
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  maxMessageSize,
	WriteBufferSize: maxMessageSize,
}

func serveWs(w http.ResponseWriter, r *http.Request, _ httprouter.Params) {
	//fmt.Println("ON serveWS")
	upgrader.CheckOrigin = func(r *http.Request) bool { return true }

	if r.Method != "GET" {
		http.Error(w, "Method not allowed", 405)
		return
	}

	ws, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	c := &client{
		send: make(chan []byte, maxMessageSize),
		ws:   ws,
	}

	h.register <- c

	go c.writePump()
	c.readPump()
}

func (c *client) readPump() {
	defer func() {
		h.unregister <- c
		c.ws.Close()
	}()

	c.ws.SetReadLimit(maxMessageSize)
	c.ws.SetReadDeadline(time.Now().Add(pongWait))
	c.ws.SetPongHandler(func(string) error {
		c.ws.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		_, message, err := c.ws.ReadMessage()
		if err != nil {
			break
		}
		//fmt.Println("On readPump")
		fmt.Println(string(message))
		//h.broadcast <- string(message)
	}
}

func (c *client) writePump() {
	//fmt.Println("On writePump")
	ticker := time.NewTicker(pingPeriod)

	defer func() {
		ticker.Stop()
		c.ws.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			if !ok {
				c.write(websocket.CloseMessage, []byte{})
				return
			}
			if err := c.write(websocket.TextMessage, message); err != nil {
				return
			}
		case <-ticker.C:
			if err := c.write(websocket.PingMessage, []byte{}); err != nil {
				return
			}
		}
	}
}

func (c *client) write(mt int, message []byte) error {
	//fmt.Println("On write")
	//fmt.Println(string(message))
	c.ws.SetWriteDeadline(time.Now().Add(writeWait))
	return c.ws.WriteMessage(mt, message)
}

///////////////////////////////////////
//MQTT
var f MQTT.MessageHandler = func(client MQTT.Client, msg MQTT.Message) {
	//fmt.Printf("TOPIC: %s\n", msg.Topic())
	//fmt.Printf("MSG: %s\n", msg.Payload())
	numberMsg++
	fmt.Println(numberMsg)
	h.broadcast <- string(msg.Payload())
}

//MQTT
var ff iotservice.MessageHandler = func(msg *common.Message) {
	numberMsg++
	fmt.Println(numberMsg)
	//fmt.Println(string(msg.Payload))
	h.broadcast <- string(msg.Payload)
}

////////////////////////////////////////
//HTTP
var tpl *template.Template


const templateDir = "/home/ubuntu/go/src/github.com/ccepedam/iot_kit_dashboard/"

func init() {
	tpl = template.Must(template.ParseGlob(filepath.Join(templateDir, "*.html")))
	err1 := os.Chdir(templateDir)
	if err1 != nil {
		panic(err1)
	}
	dir, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println(dir)
	numberMsg = 0
}

func main() {

	//////////////////////////////////////
	// Init HUB
	go h.run()

	////////////////////////////////////////
	var flagPlatform = 0

	if flagPlatform == 0 {
		//MQTT AZURE
		fmt.Println("MQTT  AZURE")
		c, err := iotservice.NewClient(
			iotservice.WithConnectionString(os.Getenv("IOTHUB_SERVICE_CONNECTION_STRING2")),
			
		)
		if err != nil {
			log.Fatal(err)
		}
		go c.SubscribeEvents(context.Background(), ff)
	} else {
		//MQTT AWS
		fmt.Println("MQTT AWS")
		var certFile = templateDir + "files/aws/certificate_file.crt"
		var keyFile = templateDir + "files/aws/private_key_file.key"
		cer, err := tls.LoadX509KeyPair(certFile, keyFile)
		if err != nil {
			panic(err)
		}

		cid := "cid"
		host := "host.amazonaws.com"
		port := 8883
		path := "/mqtt"
		topic := "topic"
		brokerURL := fmt.Sprintf("tcps://%s:%d%s", host, port, path)
		qos := flag.Int("qos", 0, "The QoS to subscribe to messages at")
		flag.Parse()

		connOpts := MQTT.NewClientOptions()
		connOpts.AddBroker(brokerURL)
		connOpts.SetClientID(cid)
		connOpts.SetMaxReconnectInterval(1 * time.Second)
		connOpts.SetTLSConfig(&tls.Config{Certificates: []tls.Certificate{cer}})
		connOpts.SetCleanSession(true)
		connOpts.SetDefaultPublishHandler(f)
		connOpts.OnConnect = func(c MQTT.Client) {
			if token := c.Subscribe(topic, byte(*qos), nil); token.Wait() && token.Error() != nil {
				panic(token.Error())
			}
		}

		mqttClient := MQTT.NewClient(connOpts)
		if token := mqttClient.Connect(); token.Wait() && token.Error() != nil {
			panic(token.Error())
		}
		log.Println("[MQTT] Connected")
	}

	fmt.Println("AFTER flagPlatform")
	////////////////////////////////////////
	//HTTP
	mux := httprouter.New()
	mux.GET("/", index)
	mux.GET("/dashboard", dashboard)
	mux.GET("/ws", serveWs)

	mux.ServeFiles("/assets/*filepath", http.Dir("assets"))
	http.ListenAndServe(":8083", mux)

}

////////////////////////////////////////
//Serving HTML files
func index(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	err := tpl.ExecuteTemplate(w, "index.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Fatalln(err)
	}
	fmt.Println("HERE INDEX")
}

func dashboard(w http.ResponseWriter, req *http.Request, _ httprouter.Params) {
	err := tpl.ExecuteTemplate(w, "dashboard.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		log.Fatalln(err)
	}
	fmt.Println("HERE DASHBOARD")
}
