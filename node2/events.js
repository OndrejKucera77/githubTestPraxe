const EventEmitter = require("events");
const Logger = require("./logger");
const logger = new Logger();

const emitter = new MyEmitter();

logger.on("zprava", (data) => {
    console.log(data);
});

logger.log("Ahoj");