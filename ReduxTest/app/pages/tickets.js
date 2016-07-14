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
    UIManager,
    ScrollView,
    Platform,
    DeviceEventEmitter }  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { CoverFlow } from 'react-native-pan-controller';
import {EventListener} from "../listener/EventListener";
import {fontSizeAndroid} from "../utils/CommonUtils.js";
import {LoadingView} from "../components/LoadingView";

var QRCode = require('react-native-qrcode');
var image_margin_left;
var image_margin_top;
var qr_view_opacity = 1;
var widthh = Dimensions.get('window').width
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var heightt = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - 20
var {height, width} = Dimensions.get('window');
var images = [
    { headImageIcon: 'http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg', eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '01', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://i2.s2.dpfile.com/pc/638089fd18888ca0e0a45f1635659b7b%28700x700%29/thumb.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '02', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://i1.s2.dpfile.com/pc/d23976621b193f9c821756bd4f79aaec%28700x700%29/thumb.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '03', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://www.shandongqingdian.com/uploads/allimg/150714/142R32033-4.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '04', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://www.mimvm.com/uploads/allimg/photo/20140531165328867.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://www.sydphotos.cn/wp-content/uploads/2013/06/58aed1e4c4664cabe3d7ad849f1005bc.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '06', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://img.izaojiao.com/upload/month_1412/201412110930465369.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '07', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://i2.s1.dpfile.com/pc/8e91cfcf85c30b051adfac7506776d11%28700x700%29/thumb.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '08', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://img3.douban.com/view/note/large/public/p223383491-7.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '09', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://i2.s2.dpfile.com/pc/f00d272c22c7c0f4cad29ae0b5c477cd%28700x700%29/thumb.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '10', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://neimenggu.sinaimg.cn/cr/2015/1207/4032417934.png", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '11', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://n.sinaimg.cn/transform/20150702/OCWi-fxesssr5385926.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '12', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
    { headImageIcon: "http://i1.s2.dpfile.com/pc/79cc79a44aaeb3d4c566eb8b2de04382%28740x2048%29/thumb.jpg", eventName: '2015 Sparxo Grand Opening(SF ...', month: 'MAY', day: '13', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias' },
]
var temp = <View style={{
    width: widthh, height: heightt,
    backgroundColor: "#3E767300",
    alignItems: 'center',
    justifyContent: 'center',
}}>
    <LoadingView style={{ width: 50, height: 50 }}/>
</View>;

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Tickets extends Component {
    constructor() {
        super();
        this.state = {

            viewCoverFlow: temp
        }

    }
    componentDidMount() {
        this.returnView();
        // EventListener.on("scrollOffset").then(this.scrollOffsetxxx.bind(this));
    }
    scrollOffsetxxx(offset) {
        console.log('xxxxxxxxxxxxxx---', offset);
        // var currentPage = offset / (heightt * (390 / 736));
        // if (currentPage > 2) {
        //     this.setState({
        //         qr_view_opacity: 0
        //     })
        // }
        // else {
        //     this.setState({
        //         qr_view_opacity: 1
        //     })
        // }
    }
    render() {
        if (Platform.OS === 'android') {
            image_margin_left = -widthh * (0 / 414);
            image_margin_top = heightt * (80 / 736);
        }
        else {
            image_margin_left = -widthh * (5 / 414);
            image_margin_top = heightt * (80 / 736);
        }
        return (
            <Image style={style.container} source={require('../img/background3.png') }>
                <Common navigator={this.props.navigator} title={this.props.title} page='Main' rightType='Share'/>
                {this.state.viewCoverFlow }
            </Image>

        );
    }
    returnView() {
        setTimeout(() => {
            var view = <CoverFlow>
                {images.map((src, i) =>
                    <View style={{
                        width: widthh, height: heightt, marginTop: 20,
                        marginLeft: image_margin_left, borderRadius: 5
                    }}>
                        <Image style={{
                            width: widthh * (250 / 414), height: heightt * (390 / 736), borderRadius: 5, marginTop: image_margin_top,
                        }} key={i} source={{ uri: src.headImageIcon }}/>
                        <View style={{ backgroundColor: 'white', width: widthh * (250 / 414), height: heightt * (210 / 736), marginTop: heightt * (80 / 736) - heightt * (370 / 736) }}>
                            <View style={{ backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (70 / 736) }}>
                                <Text style={{
                                    backgroundColor: '#00000000', color: 'black', fontSize: widthh * (14 / 414), fontFamily: 'ProximaNova-Semibold',
                                    marginTop: heightt * (15 / 736), marginLeft: widthh * (10 / 414)
                                }}>{src.month}</Text>
                                <Text style={{
                                    backgroundColor: '#00000000', color: 'black', fontSize: widthh * (27 / 414), fontFamily: 'ProximaNova-Semibold',
                                    marginLeft: widthh * (10 / 414)
                                }}>{src.day}</Text>
                                <Text style={{
                                    backgroundColor: '#00000000', color: 'black', fontSize: widthh * (20 / 414), fontFamily: 'ProximaNova-Bold',
                                    marginTop: isAndroid() ? heightt * (-58 / 736) : heightt * (-48 / 736), marginLeft: widthh * (45 / 414)
                                }}>{src.eventName}</Text>
                            </View>
                            <View style={{ backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (50 / 736) }}>
                                <Image style={{
                                    width: widthh * (17 / 414), height: heightt * (17 / 736), marginLeft: widthh * (17 / 414),
                                    marginTop: heightt * (15 / 736)
                                }} key={i} source={require('../img/timeicon.png') }/>
                                <Text style={{
                                    backgroundColor: '#00000000', color: 'black', fontSize: widthh * (16 / 414), fontFamily: 'ProximaNova-Regular',
                                    marginTop: heightt * (-18 / 736), marginLeft: widthh * (45 / 414)
                                }}>{src.time}</Text>
                            </View>
                            <View style={{ backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (50 / 736) }}>
                                <Image style={{
                                    width: widthh * (17 / 414), height: heightt * (28 / 736), marginLeft: widthh * (17 / 414),
                                    marginTop: heightt * (0 / 736)
                                }} key={i} source={require('../img/addressicon.png') }/>
                                <Text style={{
                                    backgroundColor: '#00000000', color: 'black', fontSize: widthh * (16 / 414), fontFamily: 'ProximaNova-Regular',
                                    marginTop: heightt * (-30 / 736), marginLeft: widthh * (45 / 414), lineHeight: 15
                                }}>{src.address}</Text>
                            </View>
                        </View>
                        <View style={{ backgroundColor: '#50AEED', width: widthh * (250 / 414), height: heightt * (85 / 736), borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                            <Text style={{
                                backgroundColor: '#00000000', color: 'white', fontSize: widthh * (20 / 414), fontFamily: 'ProximaNova-Bold',
                                marginTop: heightt * (15 / 736), marginLeft: widthh * (40 / 414), width: widthh * (180 / 414)
                            }}>{src.name}</Text>
                            <Text style={{
                                backgroundColor: '#00000000', color: 'white', fontSize: widthh * (20 / 414), fontFamily: 'ProximaNova-Regular',
                                marginTop: isAndroid() ? heightt * (5 / 736) : heightt * (10 / 736), marginLeft: widthh * (105 / 414), width: widthh * (80 / 414)
                            }}>VIP</Text>
                        </View>
                        <View style={{
                            backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (120 / 736), marginLeft: width * (25 / 414),
                            marginTop: widthh * (50 / 414), opacity: qr_view_opacity
                        }}>
                            <QRCode style={{ width: widthh * (110 / 414), height: heightt * (110 / 736), marginLeft: widthh * (10 / 414) }}
                                value='12D2A'
                                size={widthh * (110 / 414) }
                                bgColor='#20676B'
                                fgColor='#35CED6'/>
                            <View style={{ backgroundColor: '#00000000', marginLeft: widthh * (125 / 414), width: widthh * (120 / 414), height: heightt * (130 / 736), marginTop: heightt * (-125 / 736) }}>
                                <Text style={{ backgroundColor: '#00000000', color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'ProximaNova-Regular' }}>Ticket Status: </Text>
                                <Text style={{ backgroundColor: '#00000000', color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'ProximaNova-Semibold', marginTop: heightt * (6 / 736) }}>       Valid</Text>
                                <Text style={{ backgroundColor: '#00000000', color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'ProximaNova-Regular', marginTop: heightt * (6 / 736) }}>Ticket CODE: </Text>
                                <Text style={{ backgroundColor: '#00000000', color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'ProximaNova-Semibold', marginTop: heightt * (6 / 736) }}>      12D2A</Text>
                                <Text style={{ backgroundColor: '#00000000', color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'ProximaNova-Regular', marginTop: heightt * (6 / 736) }}> Checked-in: </Text>
                                <Text style={{ backgroundColor: '#00000000', color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'ProximaNova-Semibold', marginTop: heightt * (6 / 736) }}>1/23 9: 25 pm</Text>
                            </View>
                        </View>
                    </View>
                ) }
            </CoverFlow>
            this.setState({
                viewCoverFlow: view
            });
        }, 1000);
    }




}
Tickets.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width,
        height: height
    }
});