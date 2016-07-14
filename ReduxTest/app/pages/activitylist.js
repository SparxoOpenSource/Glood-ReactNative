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
import {ActivityListItem} from "./activityListItem";
import isAndroid from '../utils/isAndroid.js';
import RefreshableListView from "react-native-refreshable-listview";
import {fontSizeAndroid} from "../utils/CommonUtils.js";

var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
var event = [
    { use: 1, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://i1.s2.dpfile.com/pc/170955571fdcb7b3bab5df4f69f156e7%28700x700%29/thumb.jpg" },
    { use: 2, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://i2.s2.dpfile.com/pc/638089fd18888ca0e0a45f1635659b7b%28700x700%29/thumb.jpg" },
    { use: 3, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://i1.s2.dpfile.com/pc/d23976621b193f9c821756bd4f79aaec%28700x700%29/thumb.jpg" },
    { use: 4, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://www.shandongqingdian.com/uploads/allimg/150714/142R32033-4.jpg" },
    { use: 5, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://www.mimvm.com/uploads/allimg/photo/20140531165328867.jpg" },
    { use: 6, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://www.sydphotos.cn/wp-content/uploads/2013/06/58aed1e4c4664cabe3d7ad849f1005bc.jpg" },
    { use: 7, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://img.izaojiao.com/upload/month_1412/201412110930465369.jpg" },
    { use: 8, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://i2.s1.dpfile.com/pc/8e91cfcf85c30b051adfac7506776d11%28700x700%29/thumb.jpg" },
    { use: 9, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://img3.douban.com/view/note/large/public/p223383491-7.jpg" },
    { use: 10, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://i2.s2.dpfile.com/pc/f00d272c22c7c0f4cad29ae0b5c477cd%28700x700%29/thumb.jpg" },
    { use: 0, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://neimenggu.sinaimg.cn/cr/2015/1207/4032417934.png" },
    { use: 11, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://n.sinaimg.cn/transform/20150702/OCWi-fxesssr5385926.jpg" },
    { use: 12, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://i1.s2.dpfile.com/pc/79cc79a44aaeb3d4c566eb8b2de04382%28740x2048%29/thumb.jpg" },
];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
/**
 * 活动列表
 */
export class ActivityList extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(event),
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png') }>
                <Common navigator={this.props.navigator} title="Crazy May Fest 2016" page="Main" rightType="Up"/>
                <View style={style.content}>
                    <RefreshableListView
                        enableEmptySections = {true}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }
                        loadData={this._access.bind(this) }
                        refreshPrompt="Pull down to refresh"
                        backgroundColor="#00000000"
                        renderHeader ={this.renderSectionHeader.bind(this) }/>
                </View>
            </Image>
        );
    }
    renderSectionHeader() {
        return (
            <TouchableOpacity style={{
                flexDirection: "row",
                width: width, height: 60,
                alignItems: 'center',
                justifyContent: 'center',
                borderBottomWidth: 1,
                borderBottomColor: '#00000010',
            }}
                onPress={this.QR.bind(this) }>
                <Image
                    style={{ width: 20, height: 20 }}
                    source={require("../img/add.png") }/>
                <Text style={{
                    fontSize: fontSizeAndroid(20),
                    color: "#000000",
                    fontFamily: "ProximaNova-Semibold",
                    marginLeft: 50
                }}>Add new community</Text>
            </TouchableOpacity>
        );
    }
    _row(rowData, sectionID, rowID) {
        let item = <ActivityListItem date={rowData} rowID={parseInt(rowID) } navigator={this.props.navigator}/>;
        return item;
    }
    _access() {

    }
    QR() {
        this.props.navigator.push({
            name: "QrcodeReader", value: "QrcodeReader", nav: this.props.navigator
        });
    }
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#00000000',
        width: width,
        height: height
    },
    content: {
        backgroundColor: "#00000000",
        width: width,
        height: height-60
    }
});

ActivityList.propTypes = propTypes;