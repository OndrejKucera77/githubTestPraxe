log(__filename);
log(__dirname);

let url = "http://mylogger.io/log";

function log(zprava) {
    console.log(zprava);
}

module.exports = log;