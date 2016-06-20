import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, StatusBarIOS,
    Platform }  from 'react-native';
var _navigator;
import {Home} from "../app/pages/home";
import {Mic} from "../app/pages/mic";
import {Cameraq} from "../app/pages/camera";
import {PhototWall} from "../app/pages/photoWall"
import {NewCamera} from "../app/pages/newcamera"
import {NewMic} from "../app/pages/newMic"
import {Try} from "../app/pages/try"
import {Tickets} from "../app/pages/tickets"


export class Root extends Component {
    renderScene(router, navigator) {
        var component = null;
        _navigator = navigator;
        switch (router.name) {
            case "welcome":
                component = Home;
                return (<Home navigator={navigator} title={"我的主页"}/>);
            case "TICKETS":
                return (<Tickets navigator={router.nav}  title={'Tickets'}/>);
            case "MIC":
                return (<Mic navigator={router.nav} title={router.value} app={router.app} ip={router.ip}/>);
            case "NEWMIC":
                return (<NewMic navigator={router.nav} title={router.value} app={router.app} ip={router.ip}/>);
            case "CAMERA":
                return (<Cameraq navigator={router.nav}  title={router.value}/>);
            case "PHOTOWALL":
                return (<PhototWall navigator={router.nav}  title={router.value}/>);
            case "NEWCAMERA":
                return (<NewCamera navigator={router.nav}  title={router.value}/>);
            case "TRY":
                return (<Try navigator={router.nav}  title={router.value}/>);
        }

    }
    componentDidMount() {
        if (Platform.OS === 'ios') {
            StatusBarIOS.setHidden(true)
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
