/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React = require("react")
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, ScrollView, TouchableOpacity, Image}  from 'react-native';
import {NavigatorClass} from './navigator.android';
import {ChatProject} from "./chat.android";
import {CommonView} from "./common.android";

var Button = require("react-native-button");
var data = ['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10', 'row 11'];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export class Glood extends Component<{}, { dataSource?: any }> {

    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <CommonView/>
                <ListView style={styles.list}
                    dataSource={this.state.dataSource}
                    renderRow={this._row.bind(this) }/>
            </View>
        );
    }

    _row(value) {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.welcomeText} onPress={this._handerClick.bind(this, value) }>
                    <Text style={{
                        fontSize: 20,
                        color: 'white',
                        textAlign: 'center',
                        marginLeft: 20
                    }}>{value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _handerClick(value, navigator) {
        this.props.navigator.push({
            name: 'chat', value: value
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
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
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    nav: {
        justifyContent: 'space-between',
        flex: 1,
        height: 50,
    },
    list: {
        flex: 6,
        marginTop: 10
    }
     view: {
        backgroundColor: '#999999',
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    }
});
