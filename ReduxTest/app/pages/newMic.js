import React, {Component} from "react";
import { AppRegistry,
    StyleSheet,
    View,
    Text,
    ListView,
    Alert,
    Navigator,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    LayoutAnimation,
    PropTypes,
    Animated,
    Dimensions,
    DeviceEventEmitter }  from 'react-native';
import {Common} from "./common";
import {RecordAudio} from "../utils/RecordAudio";
import {NewMicItem} from "./newMic_item";
import isAndroid from '../utils/isAndroid.js';
import RefreshableListView from "react-native-refreshable-listview";
// import ExtraDimensions from 'react-native-extra-dimensions-android';
import {EventListener} from "../listener/EventListener";

var data = new Array();
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const LISTVIEW_REF = 'listView'
var ss = 70;
var tt = 70;
var app;
var footerY = 0;
var everyOne = isAndroid() ? 116 : 120;
var everyOnexxx = isAndroid() ? 116 : 120;
var index = 0;
var topp = -120;
var {deviceHeight, deviceWidth} = Dimensions.get('window');
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
// if (isAndroid()) {
//     var STATUS_BAR_HEIGHT = ExtraDimensions.get('STATUS_BAR_HEIGHT');
// }
var maxHeight = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT - 64;
var scorll = false;
var auto = false;
var inTher = false;
var myImg = require('../img/play.png');
var voiceImg = require('../img/voice.png');
var array = new Array();

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object,
    app: PropTypes.object,
    ip: PropTypes.string
};

export class NewMic extends Component {
    constructor() {
        super();
        data = new Array();
        footerY = 0;
        index = 0;
        scorll = false;
        inTher = true;
        this.state = {
            dataSource: ds.cloneWithRows(data),
            autoImage: myImg,
            voiceImage: voiceImg,
            margin_Top: maxHeight - 40,
            ShieldingLayer_Margin_Top:topp,
        }
        this._accessFileName();
    }
    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title="Crazy May Fest 2016"/>
                <View style={[style.content, { marginTop: this.state.margin_Top}]}>
                    <RefreshableListView
                        enableEmptySections = {true}
                        ref={LISTVIEW_REF}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }
                        loadData={this._accessFileName.bind(this) }
                        refreshPrompt="Pull down to refresh"/>
                </View>
                <View style={style.footer}>
                    <TouchableOpacity onPress={this.autoPlay.bind(this) } style={{ flexDirection: 'row' }}>
                        <Image source={this.state.autoImage } style={style.ImagStyle}/>
                        <Text style={{ marginTop: 32, marginLeft: 6, fontSize: 16, color: '#000000' }}>auto</Text>
                    </TouchableOpacity>
                    <TouchableWithoutFeedback onPressOut={this._stop.bind(this) } onPressIn={this._startVoice.bind(this) }>
                        <Image style={{ width: 54, height: 54 }}  source={this.state.voiceImage }/>
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={{ flexDirection: 'row' }}>
                        <Image source={require('../img/none.png') } style={style.ImagStyle}  />
                        <Text style={{ marginTop: 32, marginLeft: 6, fontSize: 16, color: '#00000000' }}>auto</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    _row(rowData, sectionID, rowID) {
        let item = <NewMicItem title={rowData} auto={auto} rowID={parseInt(rowID) }/>;
        return item;
    }
    /**
     * 新消息进来时进行滚动
     */
                        //     <View style={[style.shieldingLayer,{backgroundColor:'red',width:deviceWidth,height:120,marginTop:-800}]}>
                        // </View>

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

    /**
     * 开始录音
     */
    _startVoice() {
        var _this = this;
        this.voiceStatus(true);
        RecordAudio.prototype.startRecord(_this.props.ip, (back) => {
            // RecordAudio.prototype.recordMsg("开始录音");
        });
    }

    /**
     * 停止录音并发送
     */
    _stop() {
        var _this = this;
        this.voiceStatus(false);
        RecordAudio.prototype.stopRecord((back) => {
            // RecordAudio.prototype.recordMsg("停止录音");
            if (back.success == true) {
                var title = {
                    name: back.name,
                    ip: _this.props.ip,
                    time: back.time
                };
                data = [...data, title];
                //发送消息
                _this.sendMessage(back.Base64);
                _this._refush(data);
                console.log("*--------", everyOne + "----" + maxHeight);
                if (data.length * everyOne > maxHeight) {
                    footerY = footerY + everyOne;
                    scorll = true;
                    this._setTime();
                }
            } else {
                RecordAudio.prototype.recordMsg("录音读取失败");
            }
        });
    }
    /**
     * 更新数据到UI
     */
    _refush(value) {
        console.log("-------------", value);
        if (value.length * everyOne > maxHeight) {
            everyOnexxx = 0;
        }
        else {
            everyOnexxx;
        }
        topp = topp-everyOnexxx;
        console.log("=============",topp);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(value),
            margin_Top: this.state.margin_Top - everyOnexxx,
            ShieldingLayer_Margin_Top:topp,
        })
    }
    /**
     * 读取保存在磁盘中的录音文件
     */
    _accessFileName() {
        if (isAndroid()) {
            var _this = this;
            RecordAudio.prototype.accessFileName((back) => {
                if (back.name === "有数据") {
                    array = back.param;
                    for (var i = 0; i < array.length; i++) {
                        var title = {
                            name: array[i].name,
                            ip: array[i].ip,
                            time: array[i].time
                        };
                        data = [...data, title];
                    }
                } else {
                    RecordAudio.prototype.recordMsg(back.name);
                }
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(data)
                })
                if (data.length * everyOne > maxHeight) {
                    scorll = true;
                    this._setTime2();
                }
            });
        }
    }
    /**
     * 接收消息，并监听
     */
    componentDidMount(props) {
        EventListener.on("RecordStop").then(this.stopRecordAll.bind(this));
        // DeviceEventEmitter.addListener("TestEventName", info => {
        //     Alert.alert(info.name);
        // });

        var self = this;
        this.scrollResponder = this.refs.listView.getScrollResponder();
        this.props.app.service('messages').on('created', message => {
            if (!inTher)
                return;
            var newMessage = this.formatMessage(message);
            if (this.props.app.get('user')._id !== newMessage.userid) {
                RecordAudio.prototype.saveRecord(newMessage.text, newMessage.name, (back) => {
                    if (back.success == true) {
                        var title = {
                            name: back.name,
                            ip: newMessage.name,
                            time: back.time
                        };
                        data = [...data, title];
                        self._refush(data);
                    }
                });
                footerY = footerY + everyOne;
                if (data.length * everyOne > maxHeight) {
                    scorll = true;
                    this._setTime();
                }
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
    /**
     * 自动播放
     */
    autoPlay() {
        if (!auto) {
            myImg = require('../img/play2.png');
            this.setState({
                autoImage: myImg
            })
            auto = true;
            EventListener.trigger("AutoPlayState", auto);
        } else {
            myImg = require('../img/play.png');
            this.setState({
                autoImage: myImg
            })
            auto = false;
            EventListener.trigger("AutoPlayState", auto);
        }
    }
    /**
     * 设置录音状态
     */
    voiceStatus(bool) {
        if (bool === true) {
            voiceImg = require('../img/voice2.png');
        } else {
            voiceImg = require('../img/voice.png');
        }
        this.setState({
            voiceImage: voiceImg
        })
    }
    stopRecordAll() {
        inTher = false;
        RecordAudio.prototype.stopAllRecord();
    }
}

NewMic.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    content: {
        flex: 6,
        marginBottom: 16
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
        marginTop: 30,
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
    },
    touch: {
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
    },
    // ShieldingLayer: {
    //     width: deviceWidth,
    //     height: everyOne,
    //     backgroundColor: 'red',
    // }
});
