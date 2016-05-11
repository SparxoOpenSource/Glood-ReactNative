'use strict';

import React, {NativeModules, Component, Alert} from 'react-native';

const Recorder = NativeModules.RecordAudio;

export class RecordAudio extends Component {
    startRecord(saveFileName, callback) {
        Recorder.startRecord(saveFileName, (args) => {
            callback && callback(args);
        });
    }

    stopRecord(callback) {
        Recorder.stopRecord((args) => {
            callback && callback(args);
        });
    }

    clearCache(callback) {
        Recorder.clearCache((args) => {
            callback && callback(args);
        });
    }

    playRecord(playName, callback) {
        Recorder.playRecord(playName, (args) => {
            callback && callback(args);
        });
    }
}
