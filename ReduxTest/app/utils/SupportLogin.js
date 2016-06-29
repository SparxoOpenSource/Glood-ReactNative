import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';
var Actions = require('react-native-router-flux').Actions;
import {HardwareUtils} from "./HardwareUtils";
import {EventListener} from "../listener/EventListener";
import {Pop} from "./AlertPop";
import {AsyncStorage}  from 'react-native';

// This is required for socket.io-client due to a bug in React Native debugger
if (window.navigator && Object.keys(window.navigator).length == 0) {
    window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}
var io = require('socket.io-client/socket.io');
var app;
var email;
var password;

export function Initialization() {
    const options = { transports: ['websocket'], forceNew: true };
    const socket = io('http://50.18.208.72:30030', options);
    // const socket = io('http://192.168.31.221:3030', options);

    app = feathers()
        .configure(socketio(socket))
        .configure(hooks())
        // Use AsyncStorage to store our login toke
        .configure(authentication({
            storage: AsyncStorage
        }));

    app.io.on('connect', () => {
        app.authenticate().then(() => {

        }).catch(error => {

        });
    });

    app.io.on('disconnect', () => {
        
    });
}

export function LoginNow(value, navigator) {
    HardwareUtils.prototype.getAddressIp((call) => {

        email = call.IP;
        password = call.IP;
        app.authenticate({
            type: 'local',
            email: call.IP,
            password: call.IP
        }).then(response => {
            Pop("用户登录成功");
            navigator.push({
                name: value, value: value, nav: navigator, app: app, ip: call.IP
            });
        }).catch(error => {
            Pop("登录失败");
            // Pop(error);
            console.log('ERROR-1', error);
            register(value, navigator, call);
            return;
        });
    });
}
function register(value, navigator, call) {
    var userData = {
        email: call.IP,
        password: call.IP
    };

    app.service('users').create(userData).then((result) => {
        app.authenticate({
            type: 'local',
            email: call.IP,
            password: call.IP
        }).then(response => {
            Pop("用户注册成功");
            navigator.push({
                name: value, value: value, nav: navigator, app: app, ip: call.IP
            });
            // re-route to main authorized chat   component
        }).catch(error => {
            Pop("自动注册失败");
            // Pop(error);
            console.log('ERROR-2', error);
        });
    }).catch((err) => {
            Pop("自动注册失败");
        // Pop(err);
        console.log('ERROR-3', err);
    });
}