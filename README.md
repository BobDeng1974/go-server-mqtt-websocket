# go-server-mqtt-websocket

On this project a Go server is subscribed to a MQTT borker from AWS or AZURE to fetch data from an IOT device.
The data is broadcast to the client via websockets so Charts are updated in real time.


Note 1: most of the code to create the html/css came from https://github.com/creativetimofficial/black-dashboard.

Note 2: this applicatation requires credentials for AWS and Azure to connect MQTT (see dash.go file). 
For AWS update files on "./files/aws/". For AZURE set an OS environment variable called "IOTHUB_SERVICE_CONNECTION_STRING".

Note 3: To run the application: "go run dash.go"

Author: Carlos A. Cepeda


Reference:
Creative Tim: Black-dashboard
https://github.com/creativetimofficial/black-dashboard/archive/master.zip


go get github.com/eclipse/paho.mqtt.golang
go get github.com/gorilla/websocket
go get github.com/julienschmidt/httprouter


Other Reference Links:
https://stackoverflow.com/questions/48872360/golang-mqtt-publish-and-subscribe?rq=1
https://github.com/eclipse/paho.mqtt.golang/blob/master/cmd/stdoutsub/main.go
https://qiita.com/sat0ken/items/249b1f01da4dd2cc5b4f
https://www.eclipse.org/paho/clients/golang/
https://github.com/eclipse/paho.mqtt.golang/issues/72
https://github.com/wisegrowth/wisebot-operator/blob/master/iot/iot.go#L138
https://github.com/wolfeidau/aws-iot-go/blob/master/cmds/iotprov/command_list_things.go
https://docs.aws.amazon.com/sdk-for-go/api/service/iot/#New
https://groups.google.com/forum/#!topic/mqtt/curMBFyBFSI
https://stackoverflow.com/questions/34409792/http-post-to-aws-iot-using-golang-aws-sdk-iotdataplane

#Multiple WS connections:
https://www.jonathan-petitcolas.com/2015/01/27/playing-with-websockets-in-go.html
