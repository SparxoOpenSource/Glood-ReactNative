import React from "react";
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity }  from 'react-native';
var _navigator;
import {Home} from "../app/pages/home";
import {Mic} from "../app/pages/mic";
import {Cameraq} from "../app/pages/camera";
import {PhototWall} from "../app/pages/photoWall"


export class Root extends Component {
    renderScene(router, navigator) {
        var component = null;
        _navigator = navigator;
        switch (router.name) {
            case "welcome":
                component = Home;
                return (<Home navigator={navigator} />);
            case "MIC":
                Mic.prototype._setTitle(router.value);
                return (<Mic navigator={navigator} />);
            case "CAMERA":
                Cameraq.prototype._setTitle(router.value);
                return (<Cameraq navigator={navigator} />);
            case "PHOTOWALL":
                PhototWall.prototype._setTitle(router.value);
                return (<PhototWall navigator={navigator} />);

        }

    }
    render() {
        return (

            <Navigator
                initialRoute={{ name: 'welcome' }}
                renderScene={this.renderScene} />
        );
    }
}
