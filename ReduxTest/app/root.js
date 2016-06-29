import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, StatusBarIOS,
    Platform, Dimensions, PropTypes}  from 'react-native';
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
import {DrawerMe} from '../app/pages/drawer/drawer';
import {Introduce} from "../app/pages/introduce"
import {ActivityList} from "../app/pages/activitylist"
import {EventInfo} from "../app/pages/eventInfo"
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string
};

export class Root extends Component {
    renderScene(router, navigator) {
        var component = null;
        _navigator = navigator;
        switch (router.name) {
            case "Introduce":
                component = Introduce;
                return (<Introduce navigator={navigator}/>);
                // component = EventInfo;
                // return (<EventInfo navigator={navigator}/>);
            case "Login":
                component = Login;
                return (<Login navigator={navigator}/>);
            case "TICKETS":
                return (<Tickets navigator={router.nav}  title={'Tickets'}/>);
            case "EVENTINFO":
                return (<EventInfo navigator={router.nav}  title={'EventInfo'}/>);
            case "MIC":
                return (<Mic navigator={router.nav} title={router.value} app={router.app} ip={router.ip}/>);
            case "NEWMIC":
                return (<NewMic navigator={router.nav} title={router.value} app={router.app} ip={router.ip}/>);
            case "CAMERA":
                return (<Cameraqxx navigator={router.nav}  title={router.value}/>);
            case "PHOTOWALL":
                return (<PhototWall navigator={router.nav}  title={router.value}/>);
            case "NEWCAMERA":
                return (<NewCamera navigator={router.nav}  title={router.value}/>);
            case "TRY":
                return (<Try navigator={router.nav}  title={router.value}/>);
            case "DrawerMe":
                return (<DrawerMe navigator={router.nav}  title={router.value}/>);
            case "Home":
                component = Home;
                return (<Home navigator={navigator} title={"我的主页"}/>);
            case "ActivityList":
                component = ActivityList;
                return (<ActivityList navigator={navigator}  title={"数据列表"}/>);
        }

    }
    render() {
        return (
            <View style={styles.navigatorContainer}>
                <Navigator
                    ref="navigator"
                    sceneStyle={styles.container}
                    initialRoute={{ name: this.props.title == null ? 'Introduce' : this.props.title }}
                    renderScene={this.renderScene} />
            </View>
        );
    }
}
var styles = StyleSheet.create({
    container: {
        flex: 1
    },
    navigatorContainer: {
        flex: 1,
        backgroundColor: '#FF000000'
    }
});

Root.propTypes = propTypes;
