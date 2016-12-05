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
    UIManager,
    ScrollView,
    Platform,
    DeviceEventEmitter
} from 'react-native';
import { Common } from "./common";
import { NewMicItem } from "./newMic_item";
import { CoverFlow } from 'react-native-pan-controller';
import { EventListener } from "../listener/EventListener";
import { fontSizeAndroid } from "../utils/CommonUtils.js";
import { LoadingView } from "../components/LoadingView";
import isAndroid from '../utils/isAndroid.js';
import RefreshableListView from "react-native-refreshable-listview";
import { Add, SelectByRoomName, DeleteMin, Drop, Update, SelectAll } from "../utils/DBUtil"
import { joinEventChatRoom } from '../utils/CommonUtils';

var data = new Array();
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const LISTVIEW_REF = 'listView'
var QRCode = require('react-native-qrcode');
var qr_view_opacity = 1;
var widthh = Dimensions.get('window').width
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var heightt = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - 20
var {height, width} = Dimensions.get('window');
var micBackgroundImageWidth;
import Singleton from '../utils/Singleton';
var singleton = new Singleton();
var temp = <View style={{
    width: widthh, height: heightt,
    backgroundColor: "#3E767300",
    alignItems: 'center',
    justifyContent: 'center',
}}>
    <LoadingView />
</View>;

export class Communities extends Component {
    constructor() {
        super();
        singleton.setTitle("Communities");
        this.state = {
            images: [
                { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '1', month: 'MAY', day: '01', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://i2.s2.dpfile.com/pc/638089fd18888ca0e0a45f1635659b7b%28700x700%29/thumb.jpg", eventName: '2', month: 'MAY', day: '02', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://i1.s2.dpfile.com/pc/d23976621b193f9c821756bd4f79aaec%28700x700%29/thumb.jpg", eventName: '3', month: 'MAY', day: '03', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://www.shandongqingdian.com/uploads/allimg/150714/142R32033-4.jpg", eventName: '4', month: 'MAY', day: '04', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://www.mimvm.com/uploads/allimg/photo/20140531165328867.jpg", eventName: '5', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://img3.xgo-img.com.cn/dealer_article/203_500x375/deBcjvv5hBHU.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '06', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://img.izaojiao.com/upload/month_1412/201412110930465369.jpg", eventName: 'Sierra at Tahoe Ski Club', month: 'MAY', day: '07', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://i2.s1.dpfile.com/pc/8e91cfcf85c30b051adfac7506776d11%28700x700%29/thumb.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '08', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://img3.douban.com/view/note/large/public/p223383491-7.jpg", eventName: 'Sierra at Tahoe Ski Club', month: 'MAY', day: '09', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://i2.s2.dpfile.com/pc/f00d272c22c7c0f4cad29ae0b5c477cd%28700x700%29/thumb.jpg", eventName: 'Sierra at Tahoe Ski Club', month: 'MAY', day: '10', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://neimenggu.sinaimg.cn/cr/2015/1207/4032417934.png", eventName: 'Sierra at Tahoe Ski Club', month: 'MAY', day: '11', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://n.sinaimg.cn/transform/20150702/OCWi-fxesssr5385926.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '12', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
                { headImageIcon: "http://i1.s2.dpfile.com/pc/79cc79a44aaeb3d4c566eb8b2de04382%28740x2048%29/thumb.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '13', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
            ],
            mic:[ { RoomName: '1',
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
    id: 4 }],
            viewCoverFlow: temp,
            micBackgroundImageWidth:0,
            dataSource: ds.cloneWithRows(data),
        }
        
       

    }
    _refush(value) {
        console.log('xxsdfsdfsdfsdfxxxxxx2222---------',value);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(value)
        })
    }
    async getUsersFromApi() {
        try {
            var images = await this.reupdateRender();
            return images;
        } catch (error) {
            throw error;
        }
    }
    componentDidMount() {
        console.log('xxsdfsdfsdfsdfxxxxxx1111---------');
        SelectByRoomName('1', (callback) => {
            console.log("收到新消息", callback);
            data = [...callback];
            this._refush(data);
            console.log('xxsdfsdfsdfsdfxxxxxx233333---------',data);
        });

        console.log('999999999999999999999')
        this.getUsersFromApi();
        this.returnView();
        EventListener.on("scrollOffset").then(this.scrollOffsetxxx.bind(this));
    }
    reupdateRender() {
        this.returnView();
    }
    scrollOffsetxxx(offset) {
        console.log('xxxxxxxxxxxxxx---', offset);
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
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png')}>
                <Common page='Main' rightType='Down' />
                <View style={{ width: width, height: 20, backgroundColor: '#00000000' }} />
                {this.state.viewCoverFlow}
                <View style={{ flex: 0, alignItems: 'center', marginBottom: heightt * (10 / 736) }} >
                    <Image style={{ width: 70, height: 70 }} source={require('../img/voice.png')}>
                        <TouchableOpacity style={{ width: 70, height: 70 ,borderRadius:35}} source={require('../img/voice.png')} onPress={this.NewMic.bind(this, '1')} />
                    </Image>
                    
                </View>
            </Image>

        );
    }
    returnView() {
        var view = <CoverFlow>
            {this.state.images.map((src, i) =>
                <View style={{ backgroundColor: 'white', width: widthh * (270 / 414), height: heightt * (600 / 736), marginTop: heightt * (14 / 736), borderRadius: 5 }}>
                    <Image style={{
                        width: widthh * (266 / 414), height: heightt * (113 / 736), borderRadius: 5, marginLeft: widthh * (2 / 414), marginTop: 1
                    }} key={i} source={{ uri: src.headImageIcon }} resizeMode="cover" />
                    <View style={{ width: widthh * (270 / 414), height: heightt * (10 / 736), marginTop: -5, backgroundColor: 'white' }}>
                    </View>
                    <View style={{ backgroundColor: '#00000000', width: widthh * (270 / 414), height: heightt * (70 / 736), marginTop: -5 }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: widthh * (14 / 414), fontFamily: 'ProximaNova-Semibold',
                            marginTop: heightt * (20 / 736), marginLeft: widthh * (10 / 414)
                        }}>{src.month}</Text>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: widthh * (27 / 414), fontFamily: 'ProximaNova-Semibold',
                            marginLeft: widthh * (10 / 414)
                        }}>{src.day}</Text>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: widthh * (18 / 414), fontFamily: 'ProximaNova-Bold',
                            marginTop: isAndroid() ? heightt * (-58 / 736) : heightt * (-48 / 736), marginLeft: widthh * (45 / 414)
                        }}>{src.eventName}</Text>
                    </View>
                    <TouchableOpacity style={{
                        flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', width: widthh * (95 / 414),
                        height: heightt * (30 / 736), marginLeft: widthh * (20 / 414), borderRadius: widthh * (30 / 414) / 2,
                        borderWidth: 1, borderColor: '#008FFF'
                    }} onPress={this.InfoXX.bind(this)}>
                        <Text style={{ backgroundColor: '#00000000', color: '#008FFF', fontSize: widthh * (16 / 414), fontFamily: 'ProximaNova-Regular', }}>
                            info
                            </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flex: 0, alignItems: 'center', justifyContent: 'center', backgroundColor: '#008FFF', width: widthh * (120 / 414),
                        height: heightt * (30 / 736), marginLeft: widthh * ((20 + 95 + 10) / 414), borderRadius: widthh * (30 / 414) / 2,
                        borderWidth: 1, borderColor: '#008FFF', marginTop: -heightt * (30 / 736)
                    }} onPress={this.CheckIn.bind(this)}>
                        <Text style={{ backgroundColor: '#00000000', color: 'white', fontSize: widthh * (16 / 414), fontFamily: 'ProximaNova-Regular', }}>
                            check-in
                            </Text>
                    </TouchableOpacity>
                    <View style={{
                        width: widthh * (250 / 414), height: heightt * (310 / 736),
                        marginLeft: widthh * (10 / 414), marginTop: heightt * (45 / 736), flex: 4,flexDirection:'column',
                    }} >
                        {this.state.mic.map((xxx, i) =>
                            <View style={{ flex: 1}}>
                                <Image style={{ flex: 0, justifyContent: 'center', alignItems: 'center', borderRadius: heightt * (23 / 736), width: micBackgroundImageWidth, height: heightt * (46 / 736) }}
                                    key={i} source={require('../img/background.png')} >
                                    <Image style={{ width: heightt * (46 / 736), height: heightt * (46 / 736), borderRadius: heightt * (23 / 736) }}
                                        key={i} source={require('../img/171604419.jpg')}>
                                        <TouchableOpacity style={{ width: heightt * (46 / 736), height: heightt * (46 / 736), borderRadius: heightt * (23 / 736) }}
                                         onPress={this.NewMic.bind(this, '1')}>
                                        </TouchableOpacity>
                                    </Image>
                                </Image>
                            </View>
                     )}
                     <View style={{flex:0.25}}>
                            </View>
                    </View>

                </View>

            )}

        </CoverFlow>
        this.setState({
            viewCoverFlow: view
        });
    }
    
    _row(rowData, sectionID, rowID) {
        let item = <NewMicItem title={rowData} auto={auto} rowID={parseInt(rowID)} dateLength={data.length} />;
        return item;
    }
    _accessFileName() {
         SelectByRoomName('1');
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
    NewMic(value) {
        console.log("-=-==-=-=-=-=-=-=",value);
        joinEventChatRoom(value);
    }
}

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width,
        height: height
    }
});