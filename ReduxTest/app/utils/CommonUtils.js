'use strict';
import {Dimensions,Alert}  from 'react-native';
var {height, width} = Dimensions.get('window');
import isAndroid from './isAndroid.js';
import {EventListener} from "../listener/EventListener";
var signalr = require('react-native-signalr');
import {SignalrHubs} from './SignalrHubs';
var connection = signalr.hubConnection('http://event-chat.sparxo.com');
var proxy = connection.createHubProxy('eventHub');
import {Pop} from "./AlertPop";
if (window.navigator && Object.keys(window.navigator).length == 0) {
    window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}
var userNamexx = 'GG';
var eventNamexx;

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
  connection.logging = true;
  connection.start().done(() => {
    console.log('Now connected, connection ID=' + connection.id);
    SignalrHubs.hubserver.logOn(proxy, (userNamexx)).done(() => {
      SignalrHubs.hubserver.loadEventChatRooms(proxy).done((room) => {
        console.log('------***', room);
      }).fail(() => {
        Alert.alert('loadRooms ERROR');
      });
      Pop("user login success");
    }).fail(() => {
      Alert.alert('logon ERROR');
    });
    Pop("connection server success");
    connection.client.joins = function (userId, username, time) {
      Pop("11111111");
    };
    connection.client.newUserJoinedEventChatRoom = function (roomName, username) {
      Pop("2222222222");
    };
    connection.client.roomMessage = function (roomName, username, message) {
      Pop("33333333333");
    };
  }).fail(() => {
    console.log('Failed');
    // Pop("Failed");
  });
  connection.connectionSlow(function () {
    console.log('We are currently experiencing difficulties with the connection.')
  });

  connection.error(function (error) {
    console.log('SignalR error: ' + error)
    Pop("Signalr Error");
  });
}

export function joinEventChatRoom(eventName) {
  eventNamexx = eventName;
  SignalrHubs.hubserver.joinEventChatRoom(proxy, (eventName)).done(() => {
    Pop('joinEventChatRoom success');
    EventListener.trigger("DrawerOpenPage", "EventInfo");
    console.log('sdfsdf-------',eventName);
  }).fail(() => {
    Alert.alert('joinEventChatRoom ERROR');
  });
}

export function sendMessageInRoom(message) {
  // SignalrHubs.hubserver.sendMessageInRoom(proxy,eventNamexx,message);
  SignalrHubs.hubserver.sendMessageInRoom(proxy, (eventNamexx),(message)).done(() => {
    Pop('sendMessageInRoom success');
  }).fail(() => {
    Alert.alert('sendMessageInRoom ERROR');
  });
}

