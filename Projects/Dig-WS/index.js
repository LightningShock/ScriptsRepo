var WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: 8080
    });
//var sendArray = require("./send.js");
var user = {
    connectionIP: null,
    id: null,
    name: "Anonymous",
};



wss.on('connection', function connection(ws) {
    console.log("Connection Recieved from: " + ws.upgradeReq.connection.remoteAddress);
    var ip = ws.upgradeReq.connection.remoteAddress;
    //if ()
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            var mesg = message.toLowerCase();
            var msg = JSON.parse(mesg);
            console.log(msg);
            if (msg.m == "dig") {
                ws.send("start dig");
                wss.broadcast("test");
            }
        });

    ws.send('something');
});

//functions//functions//functions//functions//functions//

//Client message receiver


//functions//

//Broadcast function
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

//functions//

//Client Message Sending

//functions//
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
    if (cmd == "/send") {
        wss.broadcast(mesg);
    }
    else {
        var msg = {
            c: line,
        };
        client.send(JSON.stringify(msg));
    }
});
client.on('message', function(message) {
    console.log("message: " + message);
});

function sendArray(msg) {
    client.send(JSON.stringify(msg));
}
// save
function genId() {
    var d = new Date().getTime();
    var uuid = "xxxxxxxxxxxxxxxxxxxxxxxx";
    return uuid.replace(/x/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

function createIPdb(ip, uuid, userdb) {

}

function createUserdb(usrIP, uuid) {
    if (!user[uuid]) {
        if (usrIP !== undefined || uuid !== undefined) {
            user[uuid] = {
                id: uuid,
                ip: usrIP
            };
            console.log("created UserDB sucessfully!");
        }
    } else {
        console.log("Something broke, because this DB exists already!");
    }
}