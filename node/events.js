const EvEm = require("events");
const emitter = new EvEm();

emitter.addListener("messageLogged", function(e) {
    console.log("Listener called", e);
});

emitter.emit("messageLogged", {id: 1, uri: "chrome://dino"});