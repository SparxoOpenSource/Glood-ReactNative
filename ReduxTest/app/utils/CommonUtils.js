import { Dimensions, Alert } from 'react-native';
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
    console.log("----*-*----", userNamexx);
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

      Pop('joinEventChatRoom success');
      EventListener.trigger("DrawerOpenPage", "EventInfo");//调用这个监听
      console.log('joinEventChatRoom success -------', eventName);

      // Pop('joinEventChatRoom success');
      // EventListener.trigger("DrawerOpenPage", "EventInfo");
      singleton.setTitle("Crazy May Fest 2016");
      singleton.getNav().push({
        name: 'NEWMIC'
      });
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

export function getQueryString(url) {
  if (!url) { return {}; }
  // 从url(可选)或window对象获取查询字符串
  var queryString = url.split('#')[1];

  // 我们把参数保存在这里
  var obj = {};

  // 如果查询字符串存在
  if (queryString) {
    // 查询字符串不包含#后面的部分，因此去掉它
    queryString = queryString.split('#')[0];

    // 把查询字符串分割成各部分
    var arr = queryString.split('&');

    for (var i = 0; i < arr.length; i++) {
      // 分离出key和value
      var a = arr[i].split('=');

      // 考虑到这样的参数：list[]=thing1&list[]=thing2
      var paramNum = undefined;
      var paramName = a[0].replace(/\[\d*\]/, function (v) {
        paramNum = v.slice(1, -1);
        return '';
      });
      // 设置参数值（如果为空则设置为true）
      var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
      // （可选）保持大小写一致
      // paramName = paramName.toLowerCase();
      // paramValue = paramValue.toLowerCase();
      // 如果参数名已经存在
      if (obj[paramName]) {
        // 将值转成数组（如果还是字符串）
        if (typeof obj[paramName] === 'string') {
          obj[paramName] = [obj[paramName]];
        }
        // 如果没有指定数组索引
        if (typeof paramNum === 'undefined') {
          // 将值放到数组的末尾
          obj[paramName].push(paramValue);
        }
        // 如果指定了数组索引
        else {
          // 将值放在索引位置
          obj[paramName][paramNum] = paramValue;
        }
      }
      // 如果参数名不存在则设置它
      else {
        obj[paramName] = paramValue;
      }
    }
  }
  return obj;
}

