/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
"use strict";
const React = require("react");
const react_native_1 = require('react-native');
var _navigator;
var _title = "我是导航";
class CommonView extends react_native_1.Component {
    render() {
        return (React.createElement(react_native_1.View, null, React.createElement(react_native_1.View, {style: styles.view}, React.createElement(react_native_1.TouchableOpacity, {onPress: this._onBack.bind(this)}, React.createElement(react_native_1.Image, {source: require('../img/back.png'), style: { width: 26, height: 26 }})), React.createElement(react_native_1.Text, {style: { fontSize: 18, color: '#FFFFFF' }}, _title), React.createElement(react_native_1.TouchableOpacity, {onPress: this._gotoIM.bind(this)}, React.createElement(react_native_1.Image, {source: require('../img/search.png'), style: { width: 26, height: 26 }})))));
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
        }
        else {
            _title = value;
        }
    }
    _refush() {
        var yy = react_native_1.NativeModules.ToastAndroid.show("单向通信", react_native_1.NativeModules.ToastAndroid.SHORT);
        react_native_1.Alert.alert(yy);
    }
    _gotoIM() {
        // 调用callback，获取回调result
        react_native_1.NativeModules.ToastAndroid.gotoIM(function (result) {
            react_native_1.Alert.alert(result);
        });
    }
}
exports.CommonView = CommonView;
const styles = react_native_1.StyleSheet.create({
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
