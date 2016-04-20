/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React = require("react")
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, ScrollView, TouchableOpacity, Image, NativeModules}  from 'react-native';
var _navigator;
var _title = "我是导航";


export class CommonView extends Component<{}, { dataSource?: any }> {

    render() {
        return (
            <View>
                <View style = {styles.view}>
                    <TouchableOpacity onPress={this._onBack.bind(this) }>
                        <Image source={require('../img/back.png') } style={{ width: 26, height: 26 }}  />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#FFFFFF' }}>{_title}</Text>
                    <TouchableOpacity onPress={this._gotoIM.bind(this) }>
                        <Image source={require('../img/search.png') } style={{ width: 26, height: 26 }}  />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onBack() {
        _navigator.pop();
    }
    _setPop(pop) {
        _navigator = pop;
    }
    _setTitle(value) {
        if (value == null) {
            _title = "我是导航";
        } else {
            _title = value;
        }
    }
    _refush() {
        var yy = NativeModules.ToastAndroid.show("单向通信", NativeModules.ToastAndroid.SHORT);
        Alert.alert(yy);
    }

    _gotoIM() {
        // 调用callback，获取回调result
        NativeModules.ToastAndroid.gotoIM(function (result) {
            Alert.alert(result);
        });
    }
}
const styles = StyleSheet.create({
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
