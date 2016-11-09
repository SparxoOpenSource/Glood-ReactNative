import { HardwareUtils } from "./HardwareUtils";
import { EventListener } from "../listener/EventListener";
import { Pop } from "./AlertPop";
import { AsyncStorage }  from 'react-native';
import { start } from './CommonUtils';
import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';
import Singleton from './Singleton';
var Actions = require('react-native-router-flux').Actions;
var singleton = new Singleton();
if (window.navigator && Object.keys(window.navigator).length == 0) {
    window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}
var io = require('socket.io-client/socket.io');
var app;
var email;
var password;

export function Initialization() {
    // const options = { transports: ['websocket'], forceNew: true };
    // const socket = io('http://50.18.208.72:30030', options);
    // const socket = io('http://192.168.31.221:3030', options);


    // app = feathers()
    //     .configure(socketio(socket))
    //     .configure(hooks())
    //     // Use AsyncStorage to store our login toke
    //     .configure(authentication({
    //         storage: AsyncStorage
    //     }));

    // app.io.on('connect', () => {
    //     app.authenticate().then(() => {

    //     }).catch(error => {

    //     });
    // });

    // app.io.on('disconnect', () => {

    // });
}

export function LoginNow() {
    start();
    // HardwareUtils.prototype.getAddressIp();
    // console.log('xxxxxxx--*-*----',HardwareUtils.prototype.getAddressIp());
    // HardwareUtils.prototype.getAddressIp((call) => {

    //     email = call.IP;
    //     password = call.IP;
    //     app.authenticate({
    //         type: 'local',
    //         email: call.IP,
    //         password: call.IP
    //     }).then(response => {
    //         // Pop("User login success");
    //         // navigator.push({
    //         //     name: value, value: value, nav: navigator, app: app, ip: call.IP
    //         // });
    //         singleton.setIP(call.IP);
    //         singleton.setMicFunction(app);
    //     }).catch(error => {
    //         // Pop("Login failed, now user register");
    //         // Pop(error);
    //         console.log('ERROR-1', error);
    //         register(call);
    //         return;
    //     });
    // });
}
// function register(call) {
//     var userData = {
//         email: call.IP,
//         password: call.IP
//     };

//     app.service('users').create(userData).then((result) => {
//         app.authenticate({
//             type: 'local',
//             email: call.IP,
//             password: call.IP
//         }).then(response => {
//             // Pop("User registration success");
//             // navigator.push({
//             //     name: value, value: value, nav: navigator, app: app, ip: call.IP
//             // });
//             singleton.setIP(call.IP);
//             singleton.setMicFunction(app);
//             // re-route to main authorized chat   component
//         }).catch(error => {
//             // Pop("Automatic registration failure");
//             // Pop(error);
//             console.log('ERROR-2', error);
//         });
//     }).catch((err) => {
//         // Pop("Automatic registration failure");
//         // Pop(err);
//         console.log('ERROR-3', err);
//     });
// }