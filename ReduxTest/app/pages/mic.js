import React from "react";
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity }  from 'react-native';
import {Common} from "./common";
import {RecordAudio} from "../utils/RecordAudio";
import {RefreshableListView} from "react-native-refreshable-listview";

var data = [];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
const LISTVIEW_REF = 'listview'

export class Mic extends Component {
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
                    <ListView
                        ref={LISTVIEW_REF}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }/>
                </View>
                <View style={style.footer}>
                    <TouchableOpacity onPress={this._stop.bind(this) }>
                        <Image source={require('../img/stop.png') } style={style.ImagStyle}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._startVoice.bind(this) }>
                        <Image style={{ width: 54, height: 54 }}  source={require('../img/voice.png') }/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image source={require('../img/play.png') } style={style.ImagStyle}  />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _row(value) {
        return (
            <View style={style.container}>
                <TouchableOpacity style={style.welcomeText} onPress={this._play.bind(this, value) }>
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

    _setTitle(value) {
        if (value == null) {
            _title = "我是导航";
            Common.prototype._setTitle(value);
        } else {
            _title = value;
        }
        Common.prototype._setTitle(_title);
    }
    _startVoice() {
        var _this = this;
        RecordAudio.prototype.startRecord(null, (back) => {
            _this._voiceCallBack(back);
        });
    }
    _stop() {
        var _this = this;
        RecordAudio.prototype.stopRecord((back) => {
            _this._voiceCallBack(back);
            var len = data.length;
            data[len + 1] = back["name"];
            _this._refush();
            _this._play(back["name"]);
        });
    }
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            _this._voiceCallBack(back);
        });
    }
    _voiceCallBack(call) {
        Alert.alert(call["name"]);
    }

    _refush() {
        this.state = {
            dataSource: ds.cloneWithRows(data)
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
    footer: {
        backgroundColor: '#99999900',
        height: 64,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 3
    },
    ImagStyle: {
        width: 26,
        height: 26,
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
});