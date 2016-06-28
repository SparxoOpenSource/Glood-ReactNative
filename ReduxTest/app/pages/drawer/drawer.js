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


const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class DrawerMe extends Component {
    constructor() {
        super();
        this.state = {
            drawerLockMode: 'locked-open',
        }
    }
    /**
     * 接收消息，并监听
     */
    componentDidMount(props) {
        EventListener.on("OpenDrawer").then(this.OpenDrawer.bind(this));
        EventListener.on("CloseDrawer").then(this.CloseDrawer.bind(this));
        EventListener.on("DrawerGo").then(this.DrawerGo.bind(this));
    }
    render() {
        // const {
        //     drawerLockMode,
        // } = this.state;

        const navigationView = (
            <DrawerView/>
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
                <Root style={{ width: width, height: height }} title={"ActivityList"}/>
            </DrawerLayout>
        );
    }
    OpenDrawer() {
        this.drawer.openDrawer();
    }
    CloseDrawer() {
        this.drawer.closeDrawer();
    }
    DrawerGo(name) {
        switch (name) {
            case "Mingle":

                break;
            case "Tickets":
                this.props.navigator.push({
                    name: "TICKETS", value: "TICKETS", nav: this.props.navigator
                });
                break;
            case "Setting":
                break;
            case "FeedBack":
                break;
        }
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