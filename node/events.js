const EvEm = require("events");
const emitter = new EvEm();

emitter.addListener("messageLogged", function() {
    console.log("Listener called");
});

emitter.emit("messageLogged");