import { NativeModules } from 'react-native';
import React, { Component } from "react";

const Recorder = NativeModules.RecordAudio;

export class HardwareUtils extends Component{
    getAddressIp(callback) {
        Recorder.getAndroidIpAddress((args) => {
            callback && callback(args);
        });
    }
}