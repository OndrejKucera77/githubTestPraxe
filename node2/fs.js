const fs = require("fs");
const path = require("path");


fs.mkdir(path.join(__dirname, "/test"), err => {
    if (err)
        console.log("Složka už existuje.");
    else console.log("Vytvořeno");
});

fs.writeFile(path.join(__dirname, "/test", "ahoj.txt"), "Ahoj!", err => {
    if (err)
        console.log("Soubor nemohl být vytvořen.");
    else {
        fs.appendFile(path.join(__dirname, "/test", "ahoj.txt"), "\nNode", err => {
            if (err)
                console.log("Psaní do souboru se nepovedlo.");
            else console.log("Připsáno");
        });

        console.log("Vytvořeno");
    }
});

fs.readFile(path.join(__dirname, "/test", "ahoj.txt"), "utf8", (err, data) => {
    if (err)
        console.log("Čtení souboru se nepovedlo.");
    else {
        console.log("Obsah souboru:");
        console.log(data);
    }
})

fs.rename(
    path.join(__dirname, "/test", "ahoj.txt"),
    path.join(__dirname, "/test", "node.txt"),
    err => {
        if (err)
            console.log("Něco se pokazilo při přejmenovávání souboru.");
        else console.log("Přejmenováno");
    }
)