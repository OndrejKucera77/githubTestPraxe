const fs = require("fs");

const soubory = fs.readdirSync("./");
console.log(soubory);

fs.readdir("./", function(err, files) {
    if (err) {
        console.log("Chyba: " + err);
    }
    else console.log(files);
});