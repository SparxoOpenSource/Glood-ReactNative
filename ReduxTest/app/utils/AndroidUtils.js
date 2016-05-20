import {NativeModules} from 'react-native';
import React, {Component} from "react";

const Recorder = NativeModules.AndroidInfo;

export class AndroidUtil extends Component{
    getAddressIp(callback) {
        Recorder.getAndroidIpAddress((args) => {
            callback && callback(args);
        });
    }
}