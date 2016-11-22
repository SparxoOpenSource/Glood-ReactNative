import React, { Component, PropTypes } from "react";
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
    BackAndroid,
    Platform,
    Dimensions,
    DeviceEventEmitter,
    NativeModules
} from 'react-native';
import { RecordAudio } from "../app/utils/RecordAudio";
import { Tickets } from "../app/pages/tickets"
import { TicketList } from "../app/pages/ticketList"
import { Setting } from "../app/pages/setting"
import { Feedback } from "../app/pages/feedback"
import { Authorize } from "../app/pages/authorize"
import { Login } from "../app/pages/login"
import { DrawerMe } from '../app/pages/drawer/drawer';
import { Introduce } from "../app/pages/introduce"
import { AddTicket } from "../app/pages/addTicket"
import { ActivityList } from "../app/pages/activitylist"
import { EventInfo } from "../app/pages/merchantsEventInfo"
import { UserEventInfo } from "../app/pages/userEventInfo"
import { NaviGoBack } from '../app/utils/CommonUtils';
import { EventListener } from "../app/listener/EventListener";
import { QrcodeReader } from "../app/pages/qrcode.reader";
import { NewMic } from "../app/pages/newMic"
import { sendNotification } from "../app/utils/PushNotifications";
import { TabbleIsExist, CreatTable } from "../app/utils/DBUtil";
import * as launchImage from 'react-native-launch-image';
import isAndroid from '../app/utils/isAndroid.js';
import Singleton from '../app/utils/Singleton';
import FCM from 'react-native-fcm';
var singleton = new Singleton();
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string
};

const CustomPushFromRightWithoutGestures = Object.assign(
    {},
    Navigator.SceneConfigs.FloatFromRight,
    { gestures: {} }
);

export class Root extends Component {
    renderScene(router, navigator) {
        var component = null;
        EventListener.trigger("Drawer", "Close");
        singleton.setNav(navigator);
        switch (router.name) {
            case "Introduce":
                return (<Introduce />);
            case "AddTicket":
                return (<AddTicket />);
            case "Login":
                return (<Login />);
            case "TICKETS":
                return (<Tickets />);
            case "TICKETLIST":
                return (<TicketList />);
            case "SETTING":
                return (<Setting />);
            case "FEEDBACK":
                return (<Feedback />);
            case "EVENTINFO":
                return (<EventInfo />);
            case "USEREVENTINFO":
                return (<UserEventInfo />);
            case "NEWMIC":
                return (<NewMic />);
            case "DrawerMe":
                return (<DrawerMe />);
            case "ActivityList":
                return (<ActivityList />);
            case "QrcodeReader":
                return (<QrcodeReader />);
            case "Authorize":
                return (<Authorize />);
        }
    }




    componentDidMount() {
        launchImage.hide();
        CreatTable();
        if (isAndroid()) {
            BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid.bind(this));
        }
        FCM.requestPermissions(); // for iOS
        FCM.getFCMToken().then(token => {
            console.log('----------***** 1111*', token)
            // store fcm token in your server
        });
        this.notificationUnsubscribe = FCM.on('notification', (notif) => {
            // there are two parts of notif. notif.notification contains the notification payload, notif.data contains data payload
            singleton.setTitle("Crazy May Fest 2017");
            singleton.setRoute("DrawerMe");
            if (isAndroid()) {
                singleton.getNav().push({
                    name: notif.action
                });
            } else {
                singleton.getNav().push({
                    name: notif.aps.alert.title
                });
            }
        });

        FCM.subscribeToTopic('/topics/foo-bar');
        FCM.unsubscribeFromTopic('/topics/foo-bar');
        RecordAudio.prototype.getNotification((callback) => {
            singleton.setTitle("Crazy May Fest 2017");
            singleton.setRoute("DrawerMe");
            if (isAndroid()) {
                singleton.getNav().push({
                    name: callback.action
                });
            } else {
                singleton.getNav().push({
                    name: callback.aps.alert.title
                });
            }
        })
    }
    componentWillUnmount() {
        if (isAndroid()) {
            BackAndroid.removeEventListener('hardwareBackPress');
        }

        this.refreshUnsubscribe();
        this.notificationUnsubscribe();
    }
    render() {
        return (
            <View style={styles.navigatorContainer}>
                <Navigator
                    ref={(navigator) => { return this.navigator = navigator } }
                    sceneStyle={styles.container}
                    initialRoute={{ name: singleton.getRoute() == null ? 'AddTicket' : singleton.getRoute() }}
                    renderScene={this.renderScene}
                    configureScene={(route) => {
                        return CustomPushFromRightWithoutGestures;
                    } } />
            </View>
        );
    }
    onBackAndroid() {
        const nav = this.navigator;
        EventListener.trigger("RecordStop");
        return NaviGoBack(nav);
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
