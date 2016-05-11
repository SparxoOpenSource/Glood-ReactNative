import React from "react";
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity }  from 'react-native';
import {Common} from "./common";
var data = ["MIC", "CAMERA"];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export class Home extends Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }
    render() {
        Common.prototype._setPop(this.props.navigator);
        return (
            <View style={style.container}>
                <Common/>
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
                <TouchableOpacity style={style.touch} onPress={this._handerClick.bind(this, value) }>
                    <Text style={style.text} >{value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _handerClick(value, navigator) {
        switch (value) {
            case "MIC":
                this.props.navigator.push({
                    name: value, value: "MIC"
                });
                break;
            case "CAMERA":
                this.props.navigator.push({
                    name: value, value: "Camera"
                });
                break;
        }
    }

}

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
