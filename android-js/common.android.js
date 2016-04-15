/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
"use strict";
const React = require("react");
const react_native_1 = require('react-native');
var _navigator;
class CommonView extends react_native_1.Component {
    render() {
        return (React.createElement(react_native_1.View, null, React.createElement(react_native_1.View, {style: styles.view}, React.createElement(react_native_1.TouchableOpacity, {onPress: this._onBack.bind(this)}, React.createElement(react_native_1.Image, {source: require('../img/list4.png'), style: { width: 20, height: 20 }})), React.createElement(react_native_1.Text, {style: { fontSize: 18, color: '#484848' }}, "SHOP"), React.createElement(react_native_1.Image, {source: require('../img/search.png'), style: { width: 20, height: 20 }}))));
    }
    _onBack() {
        _navigator.pop();
    }
    _setPop(pop) {
        _navigator = pop;
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
