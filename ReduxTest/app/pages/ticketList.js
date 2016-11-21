import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    Navigator,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    PropTypes,
    Dimensions,
} from 'react-native';

import { Common } from "./common";
import Singleton from '../utils/Singleton';
import { TicketListItem } from "./ticketListItem";
import RefreshableListView from "react-native-refreshable-listview";

var {height, width} = Dimensions.get('window');
var {height, width} = Dimensions.get('window');
var singleton = new Singleton();

var event = [
    { barcode: '11D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
    { barcode: '12D2A', lastName: 'Christina', fristName: 'Angela', ticketName: 'VIP Lounge Gold Tier', image: "http://att.bbs.duowan.com/forum/201508/17/184055uzl9qq6ly9xqhhl8.jpg" },
];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });


export class TicketList extends Component {
    constructor() {
        super();
        singleton.setTitle("");
        this.state = {
            dataSource: ds.cloneWithRows(event),
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png')}>
                <Common page='Delete' title={singleton.getTitle()}/>
                    <RefreshableListView
                        enableEmptySections={true}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this)}
                        loadData={this._access.bind(this)}
                        refreshPrompt="Pull down to refresh"
                        backgroundColor="#00000000" />
            </Image>
        );
    }

    _row(rowData, sectionID, rowID) {
        let item = <TicketListItem date={rowData} rowID={parseInt(rowID)} />;
        return item;
    }
    _access() {

    }

    componentWillmount() {
        console.log('xxxxxxxx---------');
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width,
        height: height,
    }
});