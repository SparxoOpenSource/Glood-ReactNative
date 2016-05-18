import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, PropTypes }  from 'react-native';
import {Common} from "./common";
import {RecordAudio} from "../utils/RecordAudio";
import {MicItem} from "./mic_item";
import isAndroid from '../utils/isAndroid.js';

var data = ["recordKeyeeApp_2016-05-10 17:30:29.wav"];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const LISTVIEW_REF = 'listview'
var ss = 70;
var tt = 70;

import P2P from "socket.io-p2p";
import io from "socket.io-client";
var socket = io();
var p2p = new P2P(socket);
// p2p.on('peer-msg', function (data) {
//   console.log('From a peer %s', data);
// });

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class Mic extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
        this._accessFileName()
    }
    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={style.content}>
                    <ListView
                        ref={LISTVIEW_REF}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }/>
                </View>
                <View style={style.footer}>
                    <TouchableOpacity>
                        <Image source={require('../img/none.png') } style={style.ImagStyle}/>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPressOut={this._stop.bind(this) } onPressIn={this._startVoice.bind(this) }>
                        <Image style={{ width: 54, height: 54 }}  source={require('../img/voice.png') }/>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity>
                        <Image source={require('../img/none.png') } style={style.ImagStyle}  />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _row2(value) {
        return (
            <View style={style.container}>
                <TouchableOpacity style={style.welcomeText} onPress={this._play.bind(this, value) }>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        textAlign: 'center',
                        marginLeft: 20
                    }}>{value}</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _row(value) {
        return (
            <MicItem title={value} />
        );
    }

    //开始录音
    _startVoice() {
        var _this = this;
        RecordAudio.prototype.startRecord(null, (back) => {
            RecordAudio.prototype.recordMsg("开始录音");
            // _this._voiceCallBack(back);
        });
    }

    //停止录音
    _stop() {
        var _this = this;
        RecordAudio.prototype.stopRecord((back) => {
            RecordAudio.prototype.recordMsg("停止录音");
            data.push(back.name + "&" + back.time);
            _this._refush(data);
        });
    }

    //播放声音
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            _this._voiceCallBack(back);
        });
    }

    _voiceCallBack(call) {
        Alert.alert(call.name);
    }

    //刷新数据
    _refush(value) {
        this.setState({
            dataSource: ds.cloneWithRows(value)
        })
    }

    _accessFileName() {
        if (isAndroid()) {
            var _this = this;
        RecordAudio.prototype.accessFileName((back) => {
            if (back.name === "有数据") {
                var ss = back["param"];
                var tt = ss.split("|");
                for (var i = 0; i < tt.length; i++) {
                    data.push(tt[i]);
                }
                this.setState({
                    dataSource: ds.cloneWithRows(data)
                })
            } else {

                _this._voiceCallBack(back.name);
            }
        });
        }        
    }
    _onPress(value) {
        // var ss=this.refs.view.style.width;
        // if(ss===300){
        //     return;
        // }
        LayoutAnimation.configureNext({
            duration: 10000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 10000
            }
        });
        ss = ss + 250;
        this.refs.view.setNativeProps({
            style: { width: ss, height: tt, justifyContent: "center" }
        })
        this._play(value);
    }
}

Mic.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F3F3F3',
    },
    content: {
        flex: 6
    },
    footer: {
        backgroundColor: '#99999900',
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 3
    },
    ImagStyle: {
        width: 26,
        height: 26,
    },
    welcomeText: {
        marginLeft: 10,
        marginRight: 10,
        height: 50,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 4,
        borderColor: 'red',
        alignItems: 'center',
        backgroundColor: '#999999',
    }, touch: {
        marginLeft: 10,
        marginRight: 10,
        width: 70,
        height: 70,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: "#999999"

    },
    img: {
        width: 70,
        height: 70,
        borderWidth: 0,
        borderRadius: 35,
    }
});
