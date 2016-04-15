"use strict";
const React = require("react");
const react_native_1 = require('react-native');
const chat_android_1 = require('./chat.android');
const home_android_1 = require('./home.android');
var _navigator;
class NavigatorClass extends react_native_1.Component {
    renderScene(router, navigator) {
        var component = null;
        _navigator = navigator;
        switch (router.name) {
            case "welcome":
                component = home_android_1.Glood;
                return React.createElement(home_android_1.Glood, {navigator: navigator});
            case "chat":
                return React.createElement(chat_android_1.ChatProject, {navigator: navigator});
        }
    }
    render() {
        return (React.createElement(react_native_1.Navigator, {initialRoute: { name: 'welcome' }, renderScene: this.renderScene}));
    }
}
exports.NavigatorClass = NavigatorClass;
const style = react_native_1.StyleSheet.create({
    txtStyle: {
        flex: 1,
        width: 360,
        height: 50,
    },
    view: {
        width: 360,
        height: 50,
        backgroundColor: "#999999"
    },
    txt: {
        color: "white",
        fontSize: 38,
    },
    button: {
        height: 56,
        backgroundColor: '#cad6c5',
        justifyContent: 'center',
    },
    image: {
        width: 28,
        marginLeft: 3,
        height: 20,
    },
    text: {
        color: "white"
    }
});
