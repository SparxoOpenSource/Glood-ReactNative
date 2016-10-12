'use strict';
import { Dimensions, Alert }  from 'react-native';
import { EventListener } from "../listener/EventListener";
import { HardwareUtils } from "./HardwareUtils";
import { Pop } from "./AlertPop";
import isAndroid from './isAndroid.js';
import SignalrH from './SignalrH';
import Singleton from './Singleton';
var { height, width } = Dimensions.get('window');
var serSignalr;
var singleton = new Singleton()
if (window.navigator && Object.keys(window.navigator).length == 0) {
  window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}
var userNamexx;
HardwareUtils.prototype.getAddressIp((call) => {
  userNamexx = call.IP;
});
var eventNamexx;
var isLoginSuccess = 'no';
export function NaviGoBack(navigator) {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
}

export function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}
export function fontSizeAndroid(params) {
  return width * (params / 360)
}

export function start() {

  var signalr = SignalrH.create({
    joins: function (userId, username, time) {
      if (username != userNamexx) {
        Pop(username + "   上线了,时间：" + time);
      }
    },
    newUserJoinedEventChatRoom: function (roomName, username) {
      console.log("sdfsdf-------55555")
      if (username != userNamexx) {
        Pop(username + "   进入   " + roomName + '    聊天室');
      }
    },
    roomMessage: function (roomName, username, message) {
      if (username != userNamexx) {
        Pop(roomName + "号聊天室" + "有新消息了");
      }
      EventListener.trigger("RoomMessage", roomName, username, message);
    },
  });
  serSignalr = signalr;

  Pop("connection server ...");
  signalr.connection.start().done(() => {
    console.log("----*-*----",userNamexx);
    signalr.logOn((userNamexx)).done(() => {
      isLoginSuccess = 'yes';
      Pop("connection server Success");
      signalr.loadEventChatRooms().done((room) => {
        console.log('------***', room);
      }).fail(() => {
        Pop('loadRooms ERROR');
      })
    }).fail(() => {
      Pop("connection server ERROR");
    })
  });
}

export function joinEventChatRoom(eventName) {
  if (isLoginSuccess == 'yes') {
    Pop("joinEventChatRoom ..." + eventName);
    eventNamexx = eventName;
    singleton.setRoomName(eventName);
    serSignalr.joinEventChatRoom((eventName)).done(() => {
      // Pop('joinEventChatRoom success');
      EventListener.trigger("DrawerOpenPage", "EventInfo");
      console.log('sdfsdf-------', eventName);
    }).fail(() => {
      Pop('joinEventChatRoom ERROR');
    })
  }

}

export function sendMessageInRoom(message) {
  serSignalr.sendMessageInRoom((eventNamexx), (message)).done(() => {
    Pop('sendMessageInRoom success');
  }).fail(() => {
    Pop('sendMessageInRoom ERROR');
  })

}

