var signalr = require("react-native-signalr");
var url = 'http://event-chat.sparxo.com';
var hubName = 'eventHub';

function Signar(clients) {
    this.connection = signalr.hubConnection(url);
    this.connection.loggings = true;
    this.proxy = this.connection.createHubProxy(hubName);
    this.clients=clients;
    this.init();
}


Signar.prototype.logOn = function (username) {
    var self=this;
    return self.proxy.invoke("LogOn", username);  
}
Signar.prototype.loadEventChatRooms = function () {
    var self=this;
    return self.proxy.invoke("LoadEventChatRooms");  
}
Signar.prototype.joinEventChatRoom = function (roomName) {
    var self=this;
    return self.proxy.invoke("JoinEventChatRoom",roomName);
}
Signar.prototype.sendMessageInRoom = function (roomName,message) {
    var self=this;
    return self.proxy.invoke("SendMessageInRoom",roomName,message);
}

Signar.prototype.init = function () {
    var self=this;
    for (var key in this.clients) {
        if (this.clients.hasOwnProperty(key)) {
            let item = this.clients[key];
            self.proxy.on(key,function(){
                console.log("sdfsdf-------77777")
                item.call(self.proxy,...arguments);
            });
        }
    }
}
Signar.create = function (clients) {
    return new Signar(clients);
}

export default Signar;