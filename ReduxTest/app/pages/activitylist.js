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
    { use: 1, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 2, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 3, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 4, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 5, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 6, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 7, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 8, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 9, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 10, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 0, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 11, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
    { use: 12, total: 20, eventName: '2015 Sparxo Grand Opening', image: "http://cdn.myfonts.net/s/aw/720x360/40/0/20979.jpg" },
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
                <Common navigator={this.props.navigator} title="Crazy May Fest 2016" page="Main"/>
                <View style={style.content}>
                    <RefreshableListView
                        enableEmptySections = {true}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }
                        loadData={this._access.bind(this) }
                        refreshPrompt="Pull down to refresh"
                        backgroundColor="#00000000"
                        renderHeader ={this.renderSectionHeader.bind(this)}/>
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
        height: height
    }
});

ActivityList.propTypes = propTypes;