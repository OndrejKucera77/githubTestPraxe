const EvEm = require("events");

const Logger = require("./logger");
const logger = new Logger();

logger.addListener("messageLogged", function(e) {
    console.log("Listener called", e);
});

logger.log("zprava");