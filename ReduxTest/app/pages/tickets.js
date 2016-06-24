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
var image_margin_left;
var image_margin_top;
var qr_view_opacity=1;
var widthh = Dimensions.get('window').width
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var heightt = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight
const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Tickets extends Component {
    constructor() {
        super();
        this.state = {
            images: [
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '01', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '02', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '03', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '04', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '05', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '06', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '07', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '08', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '09', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '10', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '11', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '12', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
                { headImageIcon: require('../img/171604419.jpg'), eventName: '2015 Sparxo Grand Opening(SF ...)', month: 'MAY', day: '13', time: '9:00 pm - 12:30 am', address: '530 Brannan Street, San Francisco', name: 'Jess Cobarrusvias Vip' },
            ]
        }
    }
    componentDidMount() {
        EventListener.on("scrollOffset").then(this.scrollOffsetxxx.bind(this));
    }
     scrollOffsetxxx(offset) {
         var currentPage = offset/(heightt * (390 / 736));
         console.log('*-*-*-sdfsdfsd----',offset+'---'+currentPage);
         if(currentPage>2){
              this.setState({
                 qr_view_opacity:0
             })
         }
         else{
              this.setState({
                 qr_view_opacity:1
             })
         }
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
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <CoverFlow>
                    {this.state.images.map((src, i) =>
                        <View style={{
                            width: widthh, height: heightt, marginTop: 20,
                            marginLeft: image_margin_left, borderRadius: 5
                        }}>
                            <Image style={{
                                width: widthh * (250 / 414), height: heightt * (390 / 736), borderRadius: 5, marginTop: image_margin_top,
                            }} key={i} source={src.headImageIcon}/>
                            <View style={{ backgroundColor: 'white', width: widthh * (250 / 414), height: heightt * (210 / 736), marginTop: heightt * (80 / 736) - heightt * (370 / 736) }}>
                                <View style={{ backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (70 / 736) }}>
                                    <Text style={{ color: 'black', fontSize: widthh * (18 / 414), fontFamily: 'MyriadPro-SemiboldIt', marginTop: heightt * (10 / 736), marginLeft: widthh * (10 / 414) }}>{src.month}</Text>
                                    <Text style={{ color: 'black', fontSize: widthh * (25 / 414), fontFamily: 'MyriadPro-SemiboldIt', marginLeft: widthh * (10 / 414) }}>{src.day}</Text>
                                    <Text style={{ color: 'black', fontSize: widthh * (20 / 414), fontFamily: 'MyriadPro-SemiboldIt', marginTop: widthh * (-55 / 414), marginLeft: widthh * (60 / 414) }}>{src.eventName}</Text>
                                </View>
                                <View style={{ backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (50 / 736) }}>
                                    <Image style={{ width: widthh * (20 / 414), height: heightt * (20 / 736), marginLeft: widthh * (20 / 414), marginTop: heightt * (10 / 736) }} key={i} source={require('../img/timeicon.png') }/>
                                    <Text style={{ color: 'black', fontSize: widthh * (16 / 414), fontFamily: 'MyriadPro-SemiboldIt', marginTop: heightt * (-20 / 736), marginLeft: widthh * (60 / 414) }}>{src.time}</Text>
                                </View>
                                <View style={{ backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (50 / 736) }}>
                                    <Image style={{ width: widthh * (20 / 414), height: heightt * (31 / 736), marginLeft: widthh * (20 / 414), marginTop: heightt * (10 / 736) }} key={i} source={require('../img/addressicon.png') }/>
                                    <Text style={{ color: 'black', fontSize: widthh * (16 / 414), fontFamily: 'MyriadPro-SemiboldIt', marginTop: heightt * (-28 / 736), marginLeft: widthh * (60 / 414) }}>{src.address}</Text>
                                </View>
                            </View>
                            <View style={{ backgroundColor: '#50AEED', width: widthh * (250 / 414), height: heightt * (85 / 736), borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}>
                                <Text style={{ backgroundColor:'#00000000',color: 'white', fontSize: widthh * (20 / 414), fontFamily: 'MyriadPro-SemiboldIt', marginTop: heightt * (10 / 736), marginLeft: widthh * (50 / 414), width: widthh * (150 / 414) }}>{src.name}</Text>
                            </View>
                            <View style={{ backgroundColor: '#00000000', width: widthh * (250 / 414), height: heightt * (120 / 736), marginTop: widthh * (50 / 414),opacity: qr_view_opacity}}>
                                <Image style={{ width: widthh * (120 / 414), height: heightt * (120 / 736), marginLeft: widthh * (10 / 414) }} key={i} source={require('../img/vwat.png') }/>
                                <View style={{ backgroundColor: '#00000000', marginLeft: widthh * (150 / 414), width: widthh * (120 / 414), height: heightt * (120 / 736), marginTop: heightt * (-120 / 736) }}>
                                    <Text style={{ color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'MyriadPro-SemiboldIt' }}>Ticket Status: </Text>
                                    <Text style={{ color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'MyriadPro-SemiboldIt' }}>Valid</Text>
                                    <Text style={{ color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'MyriadPro-SemiboldIt' }}>Ticket CODE: </Text>
                                    <Text style={{ color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'MyriadPro-SemiboldIt' }}>12D2A</Text>
                                    <Text style={{ color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'MyriadPro-SemiboldIt' }}>Checked-in: </Text>
                                    <Text style={{ color: 'black', fontSize: heightt * (16 / 736), fontFamily: 'MyriadPro-SemiboldIt' }}>1/23 9: 25 pm</Text>
                                </View>
                            </View>
                        </View>

                    ) }
                </CoverFlow>

            </View>

        );
    }
}
Tickets.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
});