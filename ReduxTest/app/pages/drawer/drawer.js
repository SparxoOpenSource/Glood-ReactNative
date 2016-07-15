import React, {Component} from "react";
import { AppRegistry,
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
    DeviceEventEmitter }  from 'react-native';
import {Common} from ".././common";
import isAndroid from '../../utils/isAndroid.js';
import {EventListener} from "../../listener/EventListener";
import DrawerLayout from 'react-native-drawer-layout';
import {DrawerView} from "./drawerView";
var {height, width} = Dimensions.get('window');
import {Root} from "../../../app/root";

import {Tickets} from "../../pages/tickets"
import {ActivityList} from "../../pages/activitylist"
import {EventInfo} from "../../pages/eventInfo"


const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class DrawerMe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drawerLockMode: 'unlocked',
            indexView: <ActivityList navigator={props.navigator} title={"Mingle"}/>
        }
    }
    /**
     * 接收消息，并监听
     */
    componentDidMount(props) {
        EventListener.on("Drawer").then(this.OpenCloseDrawer.bind(this));
        EventListener.on("DrawerOpenPage").then(this.OpenPage.bind(this));
    }
    render() {
        // const {
        //     drawerLockMode,
        // } = this.state;

        const navigationView = (
            <DrawerView navigator={this.props.navigator} page={this.drawer}/>
        );

        return (
            <DrawerLayout
                onDrawerSlide={(e) => this.setState({ drawerSlideOutput: JSON.stringify(e.nativeEvent) }) }
                onDrawerStateChanged={(e) => this.setState({ drawerStateChangedOutput: JSON.stringify(e) }) }
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
    OpenPage(name, navigator) {
        var sr = "NULL";
        switch (name) {
            case "Mingle":
                sr = <ActivityList navigator={this.props.navigator} title={"Mingle"}/>;
                this.setState({
                    indexView: sr
                });
                break;
            case "Tickets":
                sr = <Tickets navigator={this.props.navigator} title={"Tickets"}/>;
                this.setState({
                    indexView: sr
                });
                break;
            case "Setting":
                this.props.navigator.push({
                    name: "SETTING", value: "SETTING", nav: this.props.navigator
                });
                break;
            case "FeedBack":
                this.props.navigator.push({
                    name: "FEEDBACK", value: "FEEDBACK", nav: this.props.navigator
                });
                break;
            case "EventInfo":
                sr = <EventInfo navigator={this.props.navigator} title={"EventInfo"}/>;
                this.setState({
                    indexView: sr
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
DrawerMe.propTypes = propTypes;