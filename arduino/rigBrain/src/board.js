const five = require('johnny-five');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const board = new five.Board({
    port: "COM4"
});




app.get("/on", function (req, res) {

    let pin = new five.Pin(7);
    pin.high()

    setTimeout(function(){
        pin.low()

    }, 3000);

    res.json({ message: 'success!'})

    // Some additional work after success
    // ...
});


app.get("/off", function (req, res) {

    let pin = new five.Pin(7);
    pin.high()

    setTimeout(function(){
        pin.low()

    }, 5000);

    res.json({ message: 'success!'})

});

/*

require('dns').resolve('www.google.com', function(err) {
  if (err) {
     console.log("No connection");
  } else {
     console.log("Connected");
  }
});

*/


app.get("/analogicSensor", function (req, res) {

    let sensor = new five.Sensor("A0");

    // Scale the sensor's data from 0-1023 to 0-10 and log changes
    sensor.on("change", function() {
        console.log(this.scaleTo(0, 10));
    });

    res.json({ message: "ok"})
});



app.get("/digitalSensor", function (req, res) {

    let pin2 = new five.Sensor({
        pin: 2,
        type: "digital"
    });

    pin2.on("change", function() {
        console.log(pin2.value);
    });

    res.json({ message: "ok"})
});



function startServer() {
    app.listen("5000", () => {
        console.log("App listening on port 5000");
    });
}

board.on('ready', startServer);





