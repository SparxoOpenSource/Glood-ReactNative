export class SignalrHubs {
    static proxy = {};
    static hubserver = {
        logOn: function (proxy,username) {
                return proxy.invoke("LogOn",username);
             },
        loadEventChatRooms: function (proxy) {
                return proxy.invoke("LoadEventChatRooms");
             },
        joinEventChatRoom:function (proxy,roomName) {
            return proxy.invoke("JoinEventChatRoom",roomName);
        },
        sendMessageInRoom:function (proxy,roomName,message) {
            return proxy.invoke("SendMessageInRoom",roomName,message);
        },
    }

}