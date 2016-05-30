import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, PropTypes, Animated, Dimensions }  from 'react-native';
import {Common} from "./common";
import {RecordAudio} from "../utils/RecordAudio";
import {MicItem} from "./mic_item";
import isAndroid from '../utils/isAndroid.js';
import RefreshableListView from "react-native-refreshable-listview";
import ExtraDimensions from 'react-native-extra-dimensions-android';

var data = ["recordKeyeeApp_2016.05.10.17.30.29.wav"];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const LISTVIEW_REF = 'listView'
var ss = 70;
var tt = 70;
var app;
var footerY = 0;
var everyOne = 109;
var index = 0;
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
// if (isAndroid()) {
//     var STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
// }
var maxHeight = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT - 64;
var scorll = false;

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object,
    app: PropTypes.object,
    ip: PropTypes.string
};

export class Mic extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data),
            messages: []
        }
        this._accessFileName();
    }
    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={style.content}>
                    <RefreshableListView
                        ref={LISTVIEW_REF}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }
                        loadData={this._accessFileName.bind(this) }
                        refreshPrompt="Pull down to refresh"/>
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
    /**
     * 新消息进来时进行滚动
     */
    _scrollToBottom() {
        this.scrollResponder.scrollTo({
            y: footerY,
            x: 0,
            animated: true,
        });
    }
    /**
     * 设置延迟时间
     */
    _setTime() {
        setTimeout(() => {
            if (scorll)
                this._scrollToBottom();
        }, 0);

    }

    _scrollToBottom2() {
        this.scrollResponder.scrollTo({
            y: footerY,
            x: 0,
            animated: true,
        });
        this._setTime2();
    }
    _setTime2() {
        var len = data.length;
        if (len > index) {
            index = index + 1;
            footerY = footerY + everyOne;
            setTimeout(() => {
                if (scorll)
                    this._scrollToBottom2();
            }, 0);
        }
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

    /**
     * 开始录音
     */
    _startVoice() {
        var _this = this;
        RecordAudio.prototype.startRecord(_this.props.ip, (back) => {
            RecordAudio.prototype.recordMsg("开始录音");
            // _this._voiceCallBack(back);
        });
    }

    /**
     * 停止录音并发送
     */
    _stop() {
        var _this = this;
        RecordAudio.prototype.stopRecord((back) => {
            RecordAudio.prototype.recordMsg("停止录音");
            if (back.success == true) {
                data = [...data, back.name + "&" + _this.props.ip + "&" + back.time];
                //发送消息
                _this.sendMessage(back.Base64);
                _this._refush(data);
                footerY = footerY + everyOne;
                if (data.length * everyOne > maxHeight)
                    scorll = true;
                this._setTime();
            } else {
                RecordAudio.prototype.recordMsg("录音读取失败");
            }
        });
    }

    /**
     * 播放声音
     */
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            _this._voiceCallBack(back);
        });
    }

    _voiceCallBack(call) {
        Alert.alert(call.name);
    }

    /**
     * 更新数据到UI
     */
    _refush(value) {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(value)
        })
    }
    /**
     * 读取保存在磁盘中的录音文件
     */
    _accessFileName() {
        data = [];
        index = 0;
        if (isAndroid()) {
            var _this = this;
            RecordAudio.prototype.accessFileName((back) => {
                if (back.name === "有数据") {
                    var ss = back.param;
                    var tt = ss.split("|");
                    for (var i = 0; i < tt.length; i++) {
                        data = [...data, tt[i]];
                    }
                } else {

                    // _this._voiceCallBack(back.name);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data)
                })
                if (data.length * everyOne > maxHeight)
                    scorll = true;
                this._setTime2();
            });
        }
    }

    /**
     * 接收消息，并监听
     */
    componentDidMount(props) {
        var self = this;
        this.scrollResponder = this.refs.listView.getScrollResponder();
        this.props.app.service('messages').on('created', message => {
            const messages = this.state.messages;
            var newMessage = this.formatMessage(message);
            messages.push(newMessage);
            this.setState({ messages });
            // Alert.alert("收到消息", this.props.app.get('user')._id + "___" + newMessage.userid);
            if (this.props.app.get('user')._id !== newMessage.userid) {
                RecordAudio.prototype.saveRecord(newMessage.text, newMessage.name, (back) => {
                    if (back.success == true) {
                        data = [...data, back.name + "&" + newMessage.name + "&" + back.time];
                        self._refush(data);
                    }
                });
                footerY = footerY + everyOne;
                if (data.length * everyOne > maxHeight)
                    scorll = true;
                this._setTime();
            }
        });

        this.props.app.service('messages').on('removed', result => {
            // this.deleteMessage(result);
        });
    }
    /**
     * 消息类型转换
     */
    formatMessage(message) {
        return {
            id: message._id,
            name: message.sentBy.email,
            text: message.text,
            userid: message.sentBy._id,
            // position: message.sentBy._id === this.app.get('user')._id ? 'left' : 'right',
            // image: { uri: message.sentBy.avatar ? message.sentBy.avatar : PLACEHOLDER },
            date: new Date(message.createdAt)
        };
    }
    /**
     * 发送消息
     */
    sendMessage(message = null, rowID = null) {
        this.props.app.service('messages').create({ text: message }).then(result => {
            console.log('message created!');
        }).catch((error) => {
            console.log('ERROR creating message');
            console.log(error);
        });
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
