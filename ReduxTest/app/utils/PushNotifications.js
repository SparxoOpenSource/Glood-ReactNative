import {NativeModules}  from 'react-native';
const not = NativeModules.NotificationFCM;

export function clickNotification(notif) {
    not.clickNotification(notif);
}