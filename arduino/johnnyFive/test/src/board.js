const express = require('express');
const bodyParser = require('body-parser');
const five = require('johnny-five');

const app = express();
const board = new five.Board({
    port: "COM4"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

    // Some additional work after success
    // ...
});



function startServer() {
    app.listen("5000", () => {
        console.log("App listening on port 5000");
    });
}

board.on('ready', startServer);





