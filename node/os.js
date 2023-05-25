const os = require("os");

let pamet = os.totalmem();
let volna = os.freemem();

console.log("Celková paměť: " + pamet + "\nVolná paměť: " + volna);