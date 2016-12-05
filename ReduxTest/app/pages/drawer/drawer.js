import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ListView,
    Alert,
    Navigator,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    LayoutAnimation,
    PropTypes,
    Animated,
    Dimensions,
    TouchableHighlight,
    Switch,
    TextInput,
    DeviceEventEmitter
} from 'react-native';
import { Common } from ".././common";
import isAndroid from '../../utils/isAndroid.js';
import { EventListener } from "../../listener/EventListener";
import DrawerLayout from 'react-native-drawer-layout';
import { EventInfo } from "../merchantsEventInfo"
import { DrawerView } from "./drawerView";
import { Root } from "../../../app/root";
import { Pop } from "../../utils/AlertPop";
import { Tickets } from "../../pages/tickets"
import { ActivityList } from "../../pages/activitylist"
import { Communities } from "../../pages/communities"
import { NewMic } from "../../pages/newMic"
import { start } from "../../utils/CommonUtils";
import Singleton from '../../utils/Singleton';
var {height, width} = Dimensions.get('window');
var singleton = new Singleton();
singleton.setTitle("Crazy May Fest 2016");

export class DrawerMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerLockMode: 'unlocked',
            indexView: <NewMic />
        }
    }
    /**
     * 接收消息，并监听
     */
    componentDidMount(props) {
        //这里给eventListener设置监听
        EventListener.on("Drawer").then(this.OpenCloseDrawer.bind(this));
        EventListener.on("DrawerOpenPage").then(this.OpenPage.bind(this));
        // setTimeout(() => {
        //     //连接聊天服务器，用户进行登录操作，系统分配用户名，ID和记录登录时间
        //     start();
        // }, 0);
    }
    componentWillUnmount() {
        console.log('Drawer------componentWillUnmount ');
        EventListener.off("Drawer");
        EventListener.off("DrawerOpenPage");
    }
    render() {
        // const {
        //     drawerLockMode,
        // } = this.state;
        const navigationView = (
            <DrawerView />
        );

        return (
            <DrawerLayout
                onDrawerSlide={(e) => this.setState({ drawerSlideOutput: JSON.stringify(e.nativeEvent) })}
                onDrawerStateChanged={(e) => this.setState({ drawerStateChangedOutput: JSON.stringify(e) })}
                drawerWidth={width - 80}
                drawerLockMode={this.state.drawerLockMode}
                ref={(drawer) => { return this.drawer = drawer } }
                keyboardDismissMode="on-drag"
                renderNavigationView={() => navigationView}>
                {this.state.indexView}
            </DrawerLayout>
        );
    }
    OpenCloseDrawer(name) {
        console.log('Drawer------OpenCloseDrawer -------name', name, 'this.drawer:', this.drawer != null);
        switch (name) {
            case "Open":
                if (this.drawer != null)
                    this.drawer.openDrawer();
                break;
            case "Close":
                if (this.drawer != null)
                    this.drawer.closeDrawer();
                break;
        }
    }
    OpenPage(name) {
        var sr = "NULL";
        switch (name) {
            case "Mingle":
                singleton.setTitle("Crazy May Fest 2016");
                sr = <NewMic />;
                this.setState({
                    indexView: sr
                });
                break;
            case "Setting":
                singleton.setTitle("SETTING");
                singleton.getNav().push({
                    name: "SETTING"
                });
                break;
            case "FeedBack":
                singleton.setTitle("FEEDBACK");
                singleton.getNav().push({
                    name: "FEEDBACK"
                });
                break;
        }
        if (this.drawer != null)
            this.drawer.closeDrawer();
    }
}

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    inputField: {
        backgroundColor: '#F2F2F2',
        height: 40,
    },
    split: {
        flexDirection: 'row',
    },
    spacedLeft: {
        paddingLeft: 10,
    }
});