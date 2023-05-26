const http = require("http");
const path = require("path");
const fs = require("fs");


const server = http.createServer((req, res) => {
    /*
    if (req.url == "/") {
        fs.readFile(path.join(__dirname, "stranka", "index.html"), "utf8", (err, data) => {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        });
    }
    else if (req.url == "/about.html") {
        fs.readFile(path.join(__dirname, "stranka", "about.html"), "utf8", (err, data) => {
            res.writeHead(200, {"Content-Type": "text/html"});
            res.end(data);
        });
    }
    */

    let filePath = path.join(__dirname, "stranka", (req.url === "/")? "index.html" : req.url);
    
    let extname = path.extname(filePath);
    let contentType = "text/html";

    if (extname == "css")
        contentType = "text/css";

    fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
            if (err.code == "ENOENT") {
                fs.readFile(path.join(__dirname, "stranka", "404.html"), "utf8", (err, data) => {
                    res.writeHead(200, {"Content-Type":contentType});
                    res.end(data, "utf8");
                });
            }
            else {
                res.writeHead(500);
                res.end(`Server error: ${res.code}`);
            }
        }
        else {
            res.writeHead(200, {"Content-Type":contentType});
            res.end(data, "utf8");
        }
    });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server běží na portu " + PORT));