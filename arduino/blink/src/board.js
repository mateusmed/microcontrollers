const express = require('express');
const bodyParser = require('body-parser');
const five = require('johnny-five');

const app = express();
const board = new five.Board({
    port: "COM4"
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/led-flash", function (req, res) {
    // perform some initial cleanup work if needed like resetting LEDs.
    // ...


    let led = new five.Led(13);
    led.blink(req.body.interval);

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





