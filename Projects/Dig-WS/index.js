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


try {
wss.on('connection', function connection(ws) {
    console.log("Connection Recieved from: " + ws.upgradeReq.connection.remoteAddress);
    var ip = ws.upgradeReq.headers['x-forwarded-for'] || ws.upgradeReq.connection.remoteAddress;
    console.log(ip);
    //if ()
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
            wss.broadcast(message);
            var mesg = message.toLowerCase();
            try {
            var msg = JSON.parse(mesg);
            if (msg.m == "dig") {
                ws.send("start dig");
                wss.broadcast("test");
            }
            } catch(err) { 
                console.log(err);
            }
            console.log(msg);
            
        });

    ws.send('hi');
});
} catch (err) {
    console.error(err);
}

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
var client = new WebSocket('ws://127.0.0.1:8080');
var iface = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

iface.on("line", function(line) {
    try {
    var args = line.split(" ");
    var cmd = args[0].toLowerCase();
    var mesg = args.join(" ");
    if (cmd == "/send") {
        wss.broadcast([{m: 'a', message: mesg}]);
    }
    else {
        var msg = {
            m: 'a', message: mesg,
        };
        msg = JSON.stringify(msg);
        client.send(msg);
    }
    }catch(e){
        console.error(e);
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