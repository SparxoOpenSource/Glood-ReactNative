import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, PropTypes }  from 'react-native';
import {Common} from "./common";
var data = ["MIC", "CAMERA", "NEWCAMERA"];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }
    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={style.content}>
                    <ListView style={style.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }/>
                </View>
            </View>
        );
    }
    _row(value) {
        return (
            <View>
                <TouchableOpacity style={style.touch} onPress={this._handerClick.bind(this, value, this.props.navigator) }>
                    <Text style={style.text} >{value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _handerClick(value, navigator) {
        switch (value) {
            case "MIC":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "CAMERA":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "NEWCAMERA":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
        }
    }

}

Home.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    content: {
        flex: 6
    },
    touch: {
        marginLeft: 10,
        marginRight: 10,
        height: 70,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: "#999999"

    },
    text: {
        fontSize: 18,
        color: "#FFFFFF",
        alignItems: "center",
        textAlign: "center"
    },
    list: {
        marginTop: 10
    },
});
