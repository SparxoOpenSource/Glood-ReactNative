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
    DeviceEventEmitter,
    Easing
} from 'react-native';
import { Common } from "./common";
import { RecordAudio } from "../utils/RecordAudio";
import { NewMicItem } from "./newMic_item";
import { EventListener } from "../listener/EventListener";
import { fontSizeAndroid } from "../utils/CommonUtils.js";
import { LoadingView } from "../components/LoadingView";
import { sendMessageInRoom } from '../utils/CommonUtils';
import { CoverFlow } from 'react-native-pan-controller';
import { Add, SelectByRoomName, DeleteMin, Drop, Update, SelectAll } from "../utils/DBUtil"
import { HardwareUtils } from "../utils/HardwareUtils";
import isAndroid from '../utils/isAndroid.js';
import RefreshableListView from "react-native-refreshable-listview";
import Singleton from '../utils/Singleton';
import { Communities } from './communities';
var widthh = Dimensions.get('window').width
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var heightt = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - 20
var {height, width} = Dimensions.get('window');
import { Dialog } from "../utils/Dialog";
var singleton = new Singleton();
var userNamexx;
const LISTVIEW_REF = 'listView'

HardwareUtils.prototype.getAddressIp((call) => {
    userNamexx = call.IP;
});
var SQLite = require('react-native-sqlite-storage');

var data = new Array();
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
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
var _animateHandler;
var backViewOpacity;
var viewOpacity = new Animated.Value(0);
var ticketViewWidth,ticketViewHeight;
var temp = <View style={{
    width: widthh, height: heightt,
    backgroundColor: "#3E767300",
    alignItems: 'center',
    justifyContent: 'center',
}}>
    <LoadingView />
</View>;

export class NewMic extends Component {
    constructor() {
        super();
        data = [];
        footerY = 0;
        index = 0;
        scorll = false;
        inTher = true;
        viewOpacity = new Animated.Value(0);
       
        this.state = {
            images: [
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '1', month: 'MAY', day: '01', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '2', month: 'MAY', day: '02', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '3', month: 'MAY', day: '03', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '4', month: 'MAY', day: '04', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '5', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '6', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '7', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '8', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '9', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '10', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '11', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '12', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
            ],
            dataSource: ds.cloneWithRows([ 
{ RoomName: '1',
    FileName: '20161125110424.wav',
    Time: 1.3,
    name: '20161125110424.wav',
    ip: '83C9A2EB-4B08-4596-956D-73BF67B0599B',
    time: 1.3,
    date: '2016-11-25 11:04:24',
    id: 1 },
  { RoomName: '1',
    FileName: '20161125110434.wav',
    Time: 4.5,
    name: '20161125110434.wav',
    ip: '83C9A2EB-4B08-4596-956D-73BF67B0599B',
    time: 4.5,
    date: '2016-11-25 11:04:34',
    id: 2 },
  { RoomName: '1',
    FileName: '20161125111155.wav',
    Time: 2.4,
    name: '20161125111155.wav',
    ip: '83C9A2EB-4B08-4596-956D-73BF67B0599B',
    time: 2.4,
    date: '2016-11-25 11:11:55',
    id: 3 },
  { RoomName: '1',
    FileName: '20161125124038.wav',
    Time: 2.2,
    name: '20161125124038.wav',
    ip: '83C9A2EB-4B08-4596-956D-73BF67B0599B',
    time: 2.2,
    date: '2016-11-25 12:40:38',
    id: 4 }
    ]),
            viewCoverFlow: temp,
            isPeoplePressed:false,
            dialog:null,
            mCallback:null,
            autoImage: myImg,
            voiceImage: voiceImg,
            like: (likeMe ? require('../img/like2.png') : require('../img/like.png')),
            people: (require('../img/like.png')),
            likeSum: 16,
            ticketViewWidth:width,
            ticketViewHeight:height,
            viewOpacity: viewOpacity,
            backViewOpacity:0.8,
        }

        this.state.people=(this.state.isPeoplePressed ? require('../img/like.png') : require('../img/people.png'));
        SelectByRoomName(singleton.getRoomName(), (callback) => {
            this.SelectByRoomName(callback);
        });
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png')}>
                <View style={{ width: width, height: height }}>
                </View>
                <Animated.View style={{width: this.state.ticketViewWidth, height: this.state.ticketViewHeight, 
                marginTop: -this.state.ticketViewHeight }}>
                    <Common page='Main' rightType='Down' />
                    <View style={{ width: this.state.ticketViewWidth, height: 20, backgroundColor: '#00000000' }} />
                    <CoverFlow>

                        {this.state.images.map((src, i) =>
                            <View ref={'backgroundView' + i} style={{
                                backgroundColor: 'white', width: this.state.ticketViewWidth * (270 / 414), height: (this.state.ticketViewHeight - Navigator.NavigationBar.Styles.General.NavBarHeight - 20) * (600 / 736),
                                marginTop: this.state.ticketViewHeight * (14 / 736), borderRadius: 5
                            }}>
                                <Image ref={'backgroundimage' + i} style={{
                                    width: this.state.ticketViewWidth * (266 / 414), height: this.state.ticketViewHeight * (113 / 736), borderRadius: 5, marginLeft: this.state.ticketViewWidth * (2 / 414), marginTop: 1
                                }} key={i} source={{ uri: src.headImageIcon }} resizeMode="cover" />
                                <View style={{ width: this.state.ticketViewWidth * (270 / 414), height: this.state.ticketViewHeight * (10 / 736), marginTop: -5, backgroundColor: 'white' }}>
                                </View>
                                <View style={{ backgroundColor: '#00000000', width: widthh * (270 / 414), height: this.state.ticketViewHeight * (70 / 736), marginTop: -5 }}>
                                    <Text style={{
                                        backgroundColor: '#00000000', color: 'black', fontSize: this.state.ticketViewWidth * (14 / 414), fontFamily: 'ProximaNova-Semibold',
                                        marginTop: this.state.ticketViewHeight * (10 / 736), marginLeft: this.state.ticketViewWidth * (10 / 414)
                                    }}>{src.month}</Text>
                                    <Text style={{
                                        backgroundColor: '#00000000', color: 'black', fontSize: this.state.ticketViewWidth * (27 / 414), fontFamily: 'ProximaNova-Semibold',
                                        marginLeft: this.state.ticketViewWidth * (10 / 414)
                                    }}>{src.day}</Text>
                                    <Text style={{
                                        backgroundColor: '#00000000', color: 'black', fontSize: this.state.ticketViewWidth * (18 / 414), fontFamily: 'ProximaNova-Bold',
                                        marginTop: isAndroid() ? this.state.ticketViewHeight * (-58 / 736) : this.state.ticketViewHeight * (-48 / 736), marginLeft: this.state.ticketViewWidth * (45 / 414)
                                    }}>{src.eventName}</Text>
                                </View>
                                <TouchableOpacity style={{
                                    flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: this.state.ticketViewWidth * (95 / 414),
                                    height: this.state.ticketViewHeight * (30 / 736), marginLeft: this.state.ticketViewWidth * (20 / 414), borderRadius: this.state.ticketViewWidth * (30 / 414) / 2,
                                    borderWidth: 1, borderColor: '#008FFF'
                                }} onPress={this.InfoXX.bind(this)}>
                                    <Text style={{ backgroundColor: '#00000000', color: '#008FFF', fontSize: this.state.ticketViewWidth * (16 / 414), fontFamily: 'ProximaNova-Regular', }}>
                                        info
                            </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#008FFF', width: this.state.ticketViewWidth * (120 / 414),
                                    height: this.state.ticketViewHeight * (30 / 736), marginLeft: this.state.ticketViewWidth * ((20 + 95 + 10) / 414), borderRadius: this.state.ticketViewWidth * (30 / 414) / 2,
                                    borderWidth: 1, borderColor: '#008FFF', marginTop: -this.state.ticketViewHeight * (30 / 736)
                                }} onPress={this.CheckIn.bind(this)}>
                                    <Text style={{ backgroundColor: '#00000000', color: 'white', fontSize: this.state.ticketViewWidth * (16 / 414), fontFamily: 'ProximaNova-Regular', }}>
                                        check-in
                            </Text>
                                </TouchableOpacity>
                                <View style={{
                                    width: this.state.ticketViewWidth * (250 / 414), height: this.state.ticketViewHeight * (245 / 736), marginLeft: this.state.ticketViewWidth * (10 / 414),
                                    marginTop: this.state.ticketViewHeight * (45 / 736)
                                }}>
                                    <Animated.Image ref={'mask' + i} style={{
                                        width: width * (270 / 414),
                                        height: heightt * (600 / 736),
                                        opacity: this.state.viewOpacity, position: 'absolute', marginTop: height * (-260 / 736), marginLeft: width * (-10 / 414)
                                    }} source={require('../img/background3.png')}>
                                    </Animated.Image>
                                    <RefreshableListView ref={'list'+i}
                                    style={{ position: 'absolute',marginLeft:-60,height:200}}
                                        enableEmptySections={true}
                                        dataSource={this.state.dataSource}
                                        renderRow={this._row.bind(this)}
                                        refreshPrompt="Pull down to refresh"/>
                                    <Animated.View ref={'backView' + i} style={{
                                        width: width * (270 / 414),
                                        height: heightt * (600 / 736),
                                        opacity: this.state.backViewOpacity, 
                                        position: 'absolute', 
                                        borderRadius:5,
                                        marginTop: height * (-502 / 736), 
                                        marginLeft: width * (-10 / 414),
                                        backgroundColor:'black',
                                    }}>
                                    </Animated.View>
                                </View>
                            </View>
                        )}
                    </CoverFlow>
                    <View style={{ flex: 1, alignItems: 'center',justifyContent:'center', flexDirection: 'row', marginTop: heightt * (500 / 736) }}>
                    <View style={{flex:2}}/>
                        <Image ref={'autoimage'} source={this.state.autoImage} style={{ flex: 1, width: 0, height: 0 }} />
                        <View style={{ flex: 20, alignItems: 'center',justifyContent:'center' }} >
                            <Image style={{ width: 70, height: 70 }} source={require('../img/voice.png')}>
                                <TouchableOpacity style={{ width: 70, height: 70, borderRadius: 35 }} source={require('../img/voice.png')}
                                    onPress={this.NewMic.bind(this, '1')} />
                            </Image>
                        </View>
                        <TouchableOpacity  style={{flex: 1, width: 23, height: 29, alignItems: 'center',justifyContent:'center' }} onPress={() => this._people()}>
                            <Image ref={'peopleimage'} source={this.state.people} style={style.ImagStyle3} />
                        </TouchableOpacity>
                        <View style={{ flex: 2 }} />
                    </View>
                </Animated.View>
                <Dialog ref="dialog" />
            </Image>
        );
    }
    InfoXX() {
        singleton.setTitle("");
        singleton.getNav().push({
            name: "USEREVENTINFO",
        });
    }
    CheckIn() {
        singleton.setTitle("");
        singleton.getNav().push({
            name: "TICKETLIST",
        });
    }
    _playAnimOne() {
        _animateHandler = Animated.parallel([
            Animated.timing(this.state.viewOpacity, {
                toValue: 1,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            })
        ]);
        this.setState({
                    viewOpacity: new Animated.Value(1),
                })
        _animateHandler.start && _animateHandler.start();
    }

    NewMic(value) {
        // console.log('------',this.refs.coverFlow)
        // debugger
        // this.refs.coverFlow._initest()
        // this.refs.coverFlow.setNativeProps({
            
        // })
        // this._playAnimOne();

        EventListener.trigger("setEnScroll");
        this.refs.autoimage.setNativeProps({
            style: {
                width: 16, height: 25
            }
        });

        this.refs.peopleimage.setNativeProps({
            style: {
                width: 23, height: 29
            }
        });
        
        var mask = 'mask' + (value - 1);
        this.refs[mask].setNativeProps({
            style: {
                width: width * (414 / 414),
                height: (heightt - Navigator.NavigationBar.Styles.General.NavBarHeight - 20) * (736 / 736),
                opacity: 1,
                position: 'absolute',
                marginTop: height * (-260 / 736),
                marginLeft: width * (-100 / 414)
            }
        });
        console.log('xxxxxxxxxxxxxx---mask', [mask]);
        listview = 'list' + (value-1) 
        this.scrollResponder = this.refs[listview].getScrollResponder();
        this.refs[listview].setNativeProps({
            style: {
                position: 'absolute',
                width: width,
                height: heightt - 110,
                marginTop: -200,
            }
        });
        
        backgroundimage2 = 'backgroundimage' + value;
        this.refs[backgroundimage2].setNativeProps({
            style: {
                marginTop: this.state.ticketViewHeight * (1400 / 736),
            }
        });
        backgroundView2 = 'backgroundView' + value;
        this.refs[backgroundView2].setNativeProps({
            style: {
                marginTop: this.state.ticketViewHeight * (1400 / 736),
            }
        });

        if ((value - 2) > 0) {
            backgroundView1 = 'backgroundView' + (value - 2);
            this.refs[backgroundView1].setNativeProps({
                style: {
                    marginTop: this.state.ticketViewHeight * (1400 / 736),
                }
            });

            backgroundimage1 = 'backgroundimage' + (value - 2);
            this.refs[backgroundimage1].setNativeProps({
                style: {
                    marginTop: this.state.ticketViewHeight * (1400 / 736),
                }
            });
        }


        
        // console.log('*-*-*-*-------',this.refs[listview]);
        // this.scrollResponder = this.refs[listview].getScrollResponder();
        // joinEventChatRoom(value);
    }

    _row(rowData, sectionID, rowID) {
        console.log('*-*-/-*-*-*---------rowData:',rowData);
        let item = <NewMicItem isWillFilterPeople={this.state.isPeoplePressed} title={rowData} auto={auto}  dateLength={data.length}  />;
        return item;
    }
    _people() {
          this.setState({
           dialog: this.refs.dialog,
       });
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

    scrollOffsetxxx(offset) {
        console.log('9999-----',offset);
        console.log('xxxxxxxxxxxxxx---', offset/(width * (310 / 414)));
        var offsetxx = ''+((offset/(width * (310 / 414)))+0.55);
        var arr = offsetxx.split(".");
        
        var page =  (parseInt(arr[0]));
        
        var backView = 'backView'+page;
        // console.log('xxxxxxxxxxxxxx---', page);
        this.refs[backView].setNativeProps({
            style: {
                width: width * (0 / 414),
                height: heightt * (0 / 736),
                opacity: 0, 
                position: 'absolute', 
                borderRadius:5,
                marginTop: height * (-502 / 736), 
                marginLeft: width * (-10 / 414),
                backgroundColor:'black',
            }
        });
        if((page+1) <= this.state.images.length)
        {
            var backView1 = 'backView'+(page+1);
        this.refs[backView1].setNativeProps({
            style: {
                width: width * (270 / 414),
                height: heightt * (600 / 736),
                opacity: 0.8, 
                position: 'absolute', 
                borderRadius:5,
                marginTop: height * (-502 / 736), 
                marginLeft: width * (-10 / 414),
                backgroundColor:'black',
            }
        });
        }
        if((page-1) >=0)
        {
            var backView2 = 'backView'+(page-1);
        this.refs[backView2].setNativeProps({
            style: {
                width: width * (270 / 414),
                height: heightt * (600 / 736),
                opacity: 0.8, 
                position: 'absolute', 
                borderRadius:5,
                marginTop: height * (-502 / 736), 
                marginLeft: width * (-10 / 414),
                backgroundColor:'black',
            }
        });
        }
        
        
        // var currentPage = offset / widthh;
        // console.log('sdfsdfsdfsfsd-*-*-',currentPage);
        // currentEventName = currentPage;
        // if (currentPage > 2) {
        //     this.setState({
        //         qr_view_opacity: 0
        //     })
        // }
        // else {
        //     this.setState({
        //         qr_view_opacity: 1
        //     })
        // }－
    }

    componentDidMount(props) {
        this.getUsersFromApi();
        // this.returnView();
        this.refs.backView0.setNativeProps({
            style: {
                width: width * (0 / 414),
                height: heightt * (0 / 736),
                opacity: 0, 
                position: 'absolute', 
                borderRadius:5,
                marginTop: height * (-502 / 736), 
                marginLeft: width * (-10 / 414),
                backgroundColor:'black',
            }
        });
        EventListener.on("scrollOffset").then(this.scrollOffsetxxx.bind(this));
        EventListener.on("RecordStop").then(this.stopRecordAll.bind(this));
        EventListener.on("PlayState").then(this.PlayState.bind(this));
        EventListener.on("RoomMessage").then(this.roomMessagexx.bind(this));
    }
    async getUsersFromApi() {
        try {
            var images = await this.reupdateRender();
            return images;
        } catch (error) {
            throw error;
        }
    }
    // reupdateRender() {
    //     this.returnView();
    // }
    componentWillUnmount() {
        EventListener.off("scrollOffset");
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
        width: width,
        height: height,
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
        marginTop: height*(465/736)
    },
    ImagStyle: {
        marginTop: 30,
        width: 16,
        height: 25,
    },
    ImagStyle2: {
        marginTop: 30,
        width: 25,
        height: 20,
        marginLeft: 20
    },
    ImagStyle3: {
        marginTop: 20,
        width: 0,
        height: 0,
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