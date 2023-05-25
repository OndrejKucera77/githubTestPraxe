const EvEm = require("events");

let url = "http://mylogger.io/log";

class Logger extends EvEm {
    log(zprava) {
        console.log(zprava);
        this.emit("messageLogged", {id: 1, uri: "chrome://dino"});
    }
}

module.exports = Logger;