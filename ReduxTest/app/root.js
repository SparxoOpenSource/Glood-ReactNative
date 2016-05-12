import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity }  from 'react-native';
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
                return (<Home navigator={navigator} title={"我的主页"}/>);
            case "MIC":
                return (<Mic navigator={router.nav} title={router.value}/>);
            case "CAMERA":
                return (<Cameraq navigator={router.nav}  title={router.value}/>);
            case "PHOTOWALL":
                return (<PhototWall navigator={router.nav}  title={router.value}/>);

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
