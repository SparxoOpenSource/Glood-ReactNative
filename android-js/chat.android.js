"use strict";
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
const React = require("react");
const react_native_1 = require('react-native');
const common_android_1 = require("./common.android");
class ChatProject extends react_native_1.Component {
    render() {
        common_android_1.CommonView.prototype._setPop(this.props.navigator);
        return (React.createElement(react_native_1.View, {style: style.container}, React.createElement(common_android_1.CommonView, null), React.createElement(react_native_1.View, {style: style.content}, React.createElement(react_native_1.Text, {style: style.welcomeText}, "在线用户列表"), React.createElement(react_native_1.TextInput, {style: style.welcomeText}))));
    }
}
exports.ChatProject = ChatProject;
const style = react_native_1.StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    welcomeText: {
        width: 200,
        height: 40,
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
    }
});
