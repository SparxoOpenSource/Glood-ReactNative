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
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
var event = [
    { use: 1, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 2, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 3, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 4, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 5, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 6, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 7, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 8, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 9, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 10, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 0, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 11, total: 20, eventName: '2015 Sparxo Grand Opening' },
    { use: 12, total: 20, eventName: '2015 Sparxo Grand Opening' },
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
            <View style={style.container}>
                <Common navigator={this.props.navigator} title="Crazy May Fest 2016"/>
                <View style={style.content}>
                    <RefreshableListView
                        enableEmptySections = {true}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }
                        loadData={this._access.bind(this) }
                        refreshPrompt="Pull down to refresh"
                        backgroundColor="#00000000"/>
                </View>
            </View>
        );
    }
    _row(rowData, sectionID, rowID) {
        let item = <ActivityListItem date={rowData} rowID={parseInt(rowID) } navigator={this.props.navigator}/>;
        return item;
    }
    _access() {

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