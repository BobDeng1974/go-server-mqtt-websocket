var counterValV = 0;
var counterValC = 0;
var counterValT = 0;

console.log("On Script");
//var socket = new WebSocket("ws://localhost:8083/ws");
var socket = new WebSocket("ws://54.163.122.89:8083/ws");

console.log("Attempting Connection...");

socket.onopen = () => {
    console.log("Successfully Connected");
    socket.send("Hi From the Client!");
};

socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
    socket.send("Client Closed!");
};

socket.onerror = error => {
    console.log("Socket Error: ", error);
};

type = ['primary', 'info', 'success', 'warning', 'danger'];

demo = {
  initPickColor: function() {
    $('.pick-class-label').click(function() {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDashboardPageCharts: function() {

    gradientChartOptionsConfigurationWithTooltipBlue = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
            padding: 20,
            fontColor: "#2380f7"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#2380f7"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipRed = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
            padding: 20,
            fontColor: "#ff0000"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(255,0,0,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff0000"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipOrange = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
            padding: 20,
            fontColor: "#ff8a76"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(220,53,69,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#ff8a76"
          }
        }]
      }
    };

    gradientChartOptionsConfigurationWithTooltipGreen = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.0)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
            padding: 20,
            fontColor: "#00f2c3"
          }
        }],

        xAxes: [{
          barPercentage: 1.6,
          gridLines: {
            drawBorder: false,
            color: 'rgba(0,242,195,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#00f2c3"
          }
        }]
      }
    };

    gradientBarChartConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },

      tooltips: {
        backgroundColor: '#f5f5f5',
        titleFontColor: '#333',
        bodyFontColor: '#666',
        bodySpacing: 4,
        xPadding: 12,
        mode: "nearest",
        intersect: 0,
        position: "nearest"
      },
      responsive: true,
      scales: {
        yAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 1,
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }],

        xAxes: [{

          gridLines: {
            drawBorder: false,
            color: 'rgba(29,140,248,0.1)',
            zeroLineColor: "transparent",
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }]
      }
    };


    var chart_labelsV = ['Time: 0:0:0'];
    var chart_dataV = [0];

    var chart_labelsC = ['Time: 0:0:0'];
    var chart_dataC = [0];

    var chart_labelsT = ['Time: 0:0:0'];
    var chart_dataT = [0];

    ////////
    var ctx = document.getElementById("chartLineRed").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(255,0,0,0.2)');
    gradientStroke.addColorStop(0.2, 'rgba(255,0,0,0.0)');
    gradientStroke.addColorStop(0, 'rgba(255,0,0,0)');


    var data = {
      labels: chart_labelsV,
      datasets: [{
        label: "Data",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#FF0000',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#FF0000',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#FF0000',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: chart_dataV,
      }]
    };

    var myChartV = new Chart(ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipRed
    });

    ////////
    var ctx = document.getElementById("CountryChart").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)'); //blue colors

    var data = {
      labels: chart_labelsC,
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#1d8cf8',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#1d8cf8',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#1d8cf8',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: chart_dataC,
      }]
    };

    var myChartC = new Chart(ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipBlue
    });

    ////////
    var ctx = document.getElementById("chartLineGreen").getContext("2d");

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)'); //green colors

    var data = {
      labels: chart_labelsT,
      datasets: [{
        label: "My First dataset",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: chart_dataT,
      }]
    };

    var myChartT = new Chart(ctx, {
      type: 'line',
      data: data,
      options: gradientChartOptionsConfigurationWithTooltipGreen
    });


    ///////////////////////////////////////////////////////////////////////////

    var chart_labels = ['Time: 0:0:0'];
    var chart_data = [0];

    var ctx = document.getElementById("chartBig1").getContext('2d');

    var gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

    gradientStroke.addColorStop(1, 'rgba(255,0,0,0.1)');
    gradientStroke.addColorStop(0.4, 'rgba(255,0,0,0.0)');
    gradientStroke.addColorStop(0, 'rgba(255,0,0,0)'); //Red colors
    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "My First dataset",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#FF0000',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#FF0000',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#FF0000',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: chart_data,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };

    var chartNumFlag = 1;

    var myChartData = new Chart(ctx, config);

    $("#0").click(function() {
      chartNumFlag = 1;
      var chart_data = chart_dataV;
      var data = myChartData.config.data;
      data.datasets[0].data = chart_data;
      data.labels = chart_labelsV;
      myChartData.update();
    });
    $("#1").click(function() {
      chartNumFlag = 2;
      var chart_data = chart_dataC;
      var data = myChartData.config.data;
      data.datasets[0].data = chart_data;
      data.labels = chart_labelsC;
      myChartData.update();
    });

    $("#2").click(function() {
      chartNumFlag = 3;
      var chart_data = chart_dataT;
      var data = myChartData.config.data;
      data.datasets[0].data = chart_data;
      data.labels = chart_labelsT;
      myChartData.update();
    });


    ////////////////////////////////////////////////////////////////////////////

    socket.onmessage = (msg) => {
        var vib = 0.0;
        var cur = 0.0;
        var tmp = 0.0;

        console.log(msg.data);

        if (msg.data.includes('vibration')) {
          var result = JSON.parse(msg.data);
          vib = Number(result.vibration).toFixed(2);
          var timeV = result.timeVibration;
          timeV = timeV.slice(0, -8);

          console.log("Vibration");
          console.log(vib);
          console.log(counterValV);

          chart_dataV.push(vib);
          chart_labelsV.push(timeV);

          counterValV++;
          if (counterValV >= 10){
            console.log("On counterValV remove");
            chart_dataV.shift();
            chart_labelsV.shift();
            counterValV--;
          }

          updateCharts(1);
        }

        if (msg.data.includes('Current')) {
          var result = JSON.parse(msg.data);
          cur = Number(result.Current).toFixed(2);
          var timeC = result.timeCurrent;
          timeC = timeC.slice(0, -8);

          console.log("Current");
          console.log(cur);
          console.log(counterValC);

          chart_dataC.push(cur);
          chart_labelsC.push(timeC);

          counterValC++;
          if (counterValC >= 10){
            console.log("On counterValC remove");
            chart_dataC.shift();
            chart_labelsC.shift();
            counterValC--;
          }

          updateCharts(2);
        }

        if (msg.data.includes('Temperature')) {
          var result = JSON.parse(msg.data);
          tmp = Number(result.Temperature).toFixed(2);
          var timeT = result.timeTemperature;
          timeT = timeT.slice(0, -8);

          console.log("Temperature");
          console.log(tmp);
          console.log(counterValT);

          chart_dataT.push(tmp);
          chart_labelsT.push(timeT);

          counterValT++;
          if (counterValT >= 10){
            console.log("On counterValT remove");
            chart_dataT.shift();
            chart_labelsT.shift();
            counterValT--;
          }

          updateCharts(3);
        }
    };

    function updateCharts(flag_update) {
      if (flag_update == 1){
        myChartV.config.data.datasets[0].data = chart_dataV;
        myChartV.config.data.labels = chart_labelsV;
        myChartV.update();
        if (chartNumFlag == 1){
          myChartData.config.data.datasets[0].data = chart_dataV;
          myChartData.config.data.labels = chart_labelsV;
          myChartData.update();
        }
      }
      if (flag_update == 2){
        myChartC.config.data.datasets[0].data = chart_dataC;
        myChartC.config.data.labels = chart_labelsC;
        myChartC.update();
        if (chartNumFlag == 2){
          myChartData.config.data.datasets[0].data = chart_dataC;
          myChartData.config.data.labels = chart_labelsC;
          myChartData.update();
        }
      }
      if (flag_update == 3){
        myChartT.config.data.datasets[0].data = chart_dataT;
        myChartT.config.data.labels = chart_labelsT;
        myChartT.update();
        if (chartNumFlag == 2){
          myChartData.config.data.datasets[0].data = chart_dataT;
          myChartData.config.data.labels = chart_labelsT;
          myChartData.update();
        }
      }
    }
  },

  showNotification: function(from, align) {
    color = Math.floor((Math.random() * 4) + 1);

    $.notify({
      icon: "tim-icons icon-bell-55",
      message: "Welcome to <b>Black Dashboard</b> - a beautiful freebie for every web developer."

    }, {
      type: type[color],
      timer: 8000,
      placement: {
        from: from,
        align: align
      }
    });
  }

};
