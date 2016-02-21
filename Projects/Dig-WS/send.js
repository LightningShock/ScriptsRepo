var WebSocket = require("ws");
var client = new WebSocket('ws://testing--youtubrer.c9users.io:8080');
var iface = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

iface.on("line", function(line) {
    var args = line.split(" ");
    var cmd = args[0].toLowerCase();
    var mesg = args.splice(1).join(" ");
    var msg = {
        c: line,
    };
    client.send(JSON.stringify(msg));
});
client.on('message', function(message) {
    console.log("message: "+message);
});

function sendArray(msg) {
    client.send(JSON.stringify(msg));
}
/*
\
\\
\\\
\\\\
\\\\\
||||| pleh was also here
////
///
//
/
*/