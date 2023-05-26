const EventEmitter = require("events");

class Logger extends EventEmitter {
    log(zprava) {
        this.emit("zprava", {id: 1, zprava});
    }
}

module.exports = Logger;