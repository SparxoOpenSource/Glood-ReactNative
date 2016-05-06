/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React = require("react")
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, TextInput, TouchableOpacity, Image}  from 'react-native';
import {NavigatorClass} from './navigator.android';
import {CommonView} from "./common.android";
var _title = "我是导航";
var data = ["http://192.168.31.162:8081/img/171604419.jpg", "http://192.168.31.162:8081/img/20160223.jpeg", "http://192.168.31.162:8081/img/eac4b1.jpg"];
//var data = [require('image!171604419')];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export class ChatProject extends Component<{}, { dataSource?: any }> {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }
    render() {
        CommonView.prototype._setPop(this.props.navigator);
        return (
            <View style={style.container}>
                <CommonView/>
                <View style={style.content}>
                    <ListView style={style.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }/>
                </View>
                <View style={style.footer}>
                    <TouchableOpacity onPress={this._setTitle.bind(this) } style={{
                        flexDirection: "row",
                        alignItems: 'flex-end',
                        marginBottom: 8
                    }}>
                        <Image source={require('../img/play.png') } style={{ width: 26, height: 26 }}  />
                        <Text style={{ fontSize: 18, color: '#333333' }}>  auto</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 78 }}>
                        <Image style={{ width: 54, height: 54 }}  source={require('../img/voice.png') }/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _setTitle(value) {
        if (value == null) {
            _title = "我是导航";
            CommonView.prototype._setTitle(value);
        } else {
            _title = value;
        }
        CommonView.prototype._setTitle(_title);
    }
    _row(value) {
        return (
            <View>
                <TouchableOpacity style={style.touch} onPress={this._handerClick.bind(this, value) }>
                    <Image source={{ uri: value } } style={style.img}  />
                </TouchableOpacity>
            </View>
        );
    }
    _handerClick(value, navigator) {

    }
}
const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    }
    , welcomeText: {
        height: 50,
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
    },
    rowstyle: {
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'red',
        width: 200,
        height: 50
    },
    content: {
        flex: 6
    },
    footer: {
        flex: 1,
        height: 54,
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    list: {
        marginTop: 10
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
    img: {
        width: 70,
        height: 70,
        borderWidth: 0,
        borderRadius: 35,
    }
});
