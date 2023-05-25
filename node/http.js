const http = require("http");

const server = http.createServer();

server.on("connection", function(socket) {
    console.log("Nové připojení");
});

server.listen(3000);

console.log("Poslouchám port 3000... :)");