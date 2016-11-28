import React, { Component } from "react";
import {
    AppRegistry,
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
    DeviceEventEmitter
} from 'react-native';
import { Common } from "./common";
import { RecordAudio } from "../utils/RecordAudio";
import { NewMicItem } from "./newMic_item";
import { EventListener } from "../listener/EventListener";
import { fontSizeAndroid } from "../utils/CommonUtils.js";
import { LoadingView } from "../components/LoadingView";
import { sendMessageInRoom } from '../utils/CommonUtils';
import { Add, SelectByRoomName, DeleteMin, Drop, Update, SelectAll } from "../utils/DBUtil"
import { HardwareUtils } from "../utils/HardwareUtils";
import isAndroid from '../utils/isAndroid.js';
import RefreshableListView from "react-native-refreshable-listview";
import Singleton from '../utils/Singleton';
var singleton = new Singleton();
var userNamexx;

HardwareUtils.prototype.getAddressIp((call) => {
    userNamexx = call.IP;
});
var SQLite = require('react-native-sqlite-storage');

var data = new Array();
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const LISTVIEW_REF = 'listView'
var ss = 70;
var tt = 70;
var footerY = 0;
var everyOne = isAndroid() ? 95 : 95;
var everyOnexxx = isAndroid() ? 95 : 95;
var index = 0;
var {deviceHeight, deviceWidth} = Dimensions.get('window');
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var maxHeight = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT - 64;
var scorll = false;
var auto = false;
var inTher = false;
var likeMe = false;
var myImg = require('../img/play.png');
var voiceImg = require('../img/voice.png');
var {height, width} = Dimensions.get('window');
var array = new Array();

export class NewMic extends Component {
    constructor() {
        super();
        data = [];
        footerY = 0;
        index = 0;
        scorll = false;
        inTher = true;
       
        this.state = {
            isPeoplePressed:false,
            dataSource: ds.cloneWithRows(data),
            autoImage: myImg,
            voiceImage: voiceImg,
            like: (likeMe ? require('../img/like2.png') : require('../img/like.png')),
            people: (require('../img/like.png')),
            likeSum: 16
        }

        this.state.people=(this.state.isPeoplePressed ? require('../img/like.png') : require('../img/people.png'));
        SelectByRoomName(singleton.getRoomName(), (callback) => {
            this.SelectByRoomName(callback);
        });
    //    var test=()=>{

    //    }
    //    const xxx=function(){

    //    }
    //    function tests(){

    //    }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png')}>
                <Common ground="fw_1.png" rightType="Down" />
                <View style={style.content}>
                    <RefreshableListView
                        enableEmptySections={true}
                        ref={LISTVIEW_REF}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this)}
                        loadData={this._accessFileName.bind(this)}
                        refreshPrompt="Pull down to refresh" />

                    <Image source={require('../img/fw_2.png')} style={style.background} />
                </View>
                <Dialog ref="dialog" mcallback={()=>this._dialogCallback()} />   
                <View style={style.footer}>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={this.state.autoImage} style={style.ImagStyle} />
                        <TouchableOpacity style={style.ImagStyle2} onPress={this.like.bind(this)}>
                            <Image source={this.state.like} style={{ width: 25, height: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ backgroundColor: '#00000000', marginTop: 32, marginLeft: 4, fontSize: fontSizeAndroid(16), color: '#FFFFFF00', fontFamily: "ProximaNova-Light" }}>{this.state.likeSum}</Text>
                    </View>
                    <TouchableWithoutFeedback onPressOut={this._stop.bind(this)} onPressIn={this._startVoice.bind(this)}>
                        <Image style={{ width: 70, height: 70 }} source={this.state.voiceImage} />
                    </TouchableWithoutFeedback>
                    <TouchableOpacity style={{ flexDirection: 'row' }}  onPress={()=>this._people()}>
                        <Text style={{ backgroundColor: '#00000000', marginTop: 32, fontSize: fontSizeAndroid(16), color: '#00000000', fontFamily: "ProximaNova-Light" }}>auto</Text>
                        <Text style={{ backgroundColor: '#00000000', marginTop: 32, fontSize: fontSizeAndroid(16), color: '#00000000', fontFamily: "ProximaNova-Light" }}>auto</Text>
                        <Image source={this.state.people} style={style.ImagStyle3} />
                    </TouchableOpacity>
                </View>
            </Image>
        );
    }

    _row(rowData, sectionID, rowID) {
        let item = <NewMicItem isWillFilterPeople={this.state.isPeoplePressed} title={rowData} auto={auto} rowID={parseInt(rowID)} dateLength={data.length}  />;
        return item;
    }
    _people() {
         this.setState({
           isPeoplePressed:(!this.state.isPeoplePressed),
       });
         this.setState({
           people:(this.state.isPeoplePressed ? require('../img/like.png') : require('../img/people.png'))
       });
    }
    /**
     * 新消息进来时进行滚动
     */
    _scrollToBottom() {
        this.scrollResponder.scrollTo({
            y: footerY + 44,
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
            y: footerY + 44,
            x: 0,
            animated: true,
        });
        this._setTime2();
    }
    _setTime2() {
        var len = data.length;
        if (len > index) {
            index = index + 1;
            if ((index - 1) * everyOne > maxHeight) {
                footerY = footerY + everyOne;
                console.log('xxxxxxx****-------', footerY, everyOne, maxHeight, index * everyOne);
            }

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
        this.voiceStatus(true);
        RecordAudio.prototype.startRecord(userNamexx, (back) => {
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
            if (back.success == true) {
                //发送消息
                _this.sendMessage(back.Base64);
            } else {
                RecordAudio.prototype.recordMsg("Failed recording");
            }
        });
    }
    /**
     * 更新数据到UI
     */
    _refush(value) {
        console.log('xxsdfsdfsdfsdfxxxxxx2222dfsdfsd---------',value);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(value)
        })
        setTimeout(() => {
            EventListener.trigger("firstTop", value.length);
        }, 1);
    }
    /**
     * 读取保存在磁盘中的录音文件
     */
    _accessFileName() {
         SelectByRoomName(singleton.getRoomName());
    }
    /**
     * 接收消息，并监听
     */
    roomMessagexx(roomname, username, roommessage) {
        console.log('-------------******---*-*-*');
        var self = this;
        if (!inTher)
            return;
        RecordAudio.prototype.saveRecord(roommessage, userNamexx, (back) => {

            if (back.success == true) {
                var title = {
                    name: back.name,
                    ip: username,
                    time: back.time
                };
                Add(roomname, back.name, back.time, username, (callback) => {

                    console.log("sdfsd--------", callback);
                    if (callback === 0)
                        return;
                    if (singleton.getRoomName() !== roomname)
                        return;
                    data = [...data, title];
                    self._refush(data);
                    if (data.length * everyOne > maxHeight) {
                        footerY = footerY + everyOne;
                        scorll = true;
                        this._setTime();
                    }
                });
            }
        });
    }

    componentDidMount(props) {
        this.scrollResponder = this.refs.listView.getScrollResponder();
        EventListener.on("RecordStop").then(this.stopRecordAll.bind(this));
        EventListener.on("PlayState").then(this.PlayState.bind(this));
        EventListener.on("RoomMessage").then(this.roomMessagexx.bind(this));

    }
    componentWillUnmount() {
        EventListener.off("RecordStop");
        EventListener.off("PlayState");
        EventListener.off("RoomMessage");
    }
    PlayState(bool) {
        if (bool === false) {
            myImg = require('../img/play2.png');
            this.setState({
                autoImage: myImg
            })
        } else {
            myImg = require('../img/play.png');
            this.setState({
                autoImage: myImg
            })
        }
    }
    /**
     * 消息类型转换
     */
    // formatMessage(message) {
    //     return {
    //         id: message._id,
    //         name: message.sentBy.email,
    //         text: message.text,
    //         userid: message.sentBy._id,
    //         date: new Date(message.createdAt)
    //     };
    // }
    /**
     * 发送消息
     */
    sendMessage(message = null, rowID = null) {
        sendMessageInRoom(message);
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
    like() {
        if (!likeMe) {
            this.setState({
                like: require('../img/like2.png'),
                likeSum: this.state.likeSum + 1
            });
            likeMe = true;
        } else {
            this.setState({
                like: require('../img/like.png'),
                likeSum: this.state.likeSum - 1
            });
            likeMe = false;
        }
    }
    SelectByRoomName(item) {
        if (item.length === 0)
            return;
        console.log("收到新消息", item);
        data = [...item];
        this._refush(data);
        if (data.length * everyOne > maxHeight) {
            scorll = true;
            this._setTime2();
        }
    }
}

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width,
        height: height
    },
    content: {
        flex: 6,
        marginBottom: 16
    },
    footer: {
        backgroundColor: '#99999900',
        height: 74,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 3
    },
    ImagStyle: {
        marginTop: 30,
        width: 16,
        height: 25,
    },
    ImagStyle2: {
        marginTop: 35,
        width: 25,
        height: 20,
        marginLeft: 20
    },
    ImagStyle3: {
        marginTop: 26,
        width: 23,
        height: 29,
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
    background: {
        position: 'absolute',
        width: width,
        height: 120,
        marginTop: -(height - 54 - 74 - 3 - 16)
    },
});