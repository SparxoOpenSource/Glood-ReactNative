import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, StatusBarIOS,
    Platform, Dimensions }  from 'react-native';
var _navigator;
import {Home} from "../app/pages/home";
import {Mic} from "../app/pages/mic";
import {Cameraq} from "../app/pages/camera";
import {PhototWall} from "../app/pages/photoWall"
import {NewCamera} from "../app/pages/newcamera"
import {NewMic} from "../app/pages/newMic"
import {Try} from "../app/pages/try"
import {Tickets} from "../app/pages/tickets"
import {Login} from "../app/pages/login"
import {Introduce} from "../app/pages/introduce"
import {Activitylist} from "../app/pages/activitylist"
var {height, width} = Dimensions.get('window');

export class Root extends Component {
    renderScene(router, navigator) {
        var component = null;
        _navigator = navigator;
        switch (router.name) {
            case "welcome":
                component = Home;
                return (<Home navigator={navigator} title={"我的主页"}/>);
                // component = Login;
                // return (<Login navigator={navigator}/>);
            case "TICKETS":
                return (<Tickets navigator={router.nav}  title={'Tickets'}/>);
            case "MIC":
                return (<Mic navigator={router.nav} title={router.value} app={router.app} ip={router.ip}/>);
            case "NEWMIC":
                return (<NewMic navigator={router.nav} title={router.value} app={router.app} ip={router.ip}/>);
            case "CAMERA":
                return (<Cameraqxx navigator={router.nav}  title={router.value}/>);
            case "PHOTOWALL":
                return (<PhototWall navigator={router.nav}  title={router.value}/>);
            case "NEWCAMERA":
                return (<Introduce navigator={router.nav}  title={router.value}/>);
            case "Introduce":
                return (<Introduce navigator={router.nav}  title={router.value}/>);
            case "Activitylist":
                return (<Activitylist navigator={router.nav}  title={router.value}/>);
        }

    }
    componentDidMount() {
        if (Platform.OS === 'ios') {
            StatusBarIOS.setHidden(true)
        }
    }
    render() {
        return (
            <View style={styles.navigatorContainer}>
                <Image source={require('../app/img/background3.png') } style={styles.background} />
                <Navigator
                    ref="navigator"
                    sceneStyle={styles.container}
                    initialRoute={{ name: 'welcome' }}
                    renderScene={this.renderScene} />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    background: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: width,
        height: height
    },
    navigatorContainer: {
        flex: 1,
        backgroundColor: '#FF000000'
    }
});
