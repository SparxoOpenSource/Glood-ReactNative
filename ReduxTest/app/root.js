import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, BackAndroid,
    Platform, Dimensions, PropTypes, DeviceEventEmitter, NativeModules}  from 'react-native';
import {Home} from "../app/pages/home";
import {Mic} from "../app/pages/mic";
import {Cameraq} from "../app/pages/camera";
import {PhototWall} from "../app/pages/photoWall"
import {NewCamera} from "../app/pages/newcamera"
import {NewMic} from "../app/pages/newMic"
import {Try} from "../app/pages/try"
import {Tickets} from "../app/pages/tickets"
import {Setting} from "../app/pages/setting"
import {Feedback} from "../app/pages/feedback"
import {Authorize} from "../app/pages/authorize"
import {Login} from "../app/pages/login"
import {DrawerMe} from '../app/pages/drawer/drawer';
import {Introduce} from "../app/pages/introduce"
import {ActivityList} from "../app/pages/activitylist"
import {EventInfo} from "../app/pages/eventInfo"
var {height, width} = Dimensions.get('window');
import isAndroid from '../app/utils/isAndroid.js';
import {NaviGoBack} from '../app/utils/CommonUtils';
import {EventListener} from "../app/listener/EventListener";
import {QrcodeReader} from "../app/pages/qrcode.reader";
import Singleton from '../app/utils/Singleton';
let singleton = new Singleton();
import FCM from 'react-native-fcm';
import {sendNotification} from "../app/utils/PushNotifications";
import {DBPage} from "../app/pages/db"


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
                return (<Introduce/>);
            case "Login":
                return (<Login/>);
            case "TICKETS":
                return (<Tickets/>);
            case "SETTING":
                return (<Setting/>);
            case "FEEDBACK":
                return (<Feedback/>);
            case "EVENTINFO":
                return (<EventInfo/>);
            case "MIC":
                return (<Mic/>);
            case "NEWMIC":
                return (<NewMic/>);
            case "CAMERA":
                return (<Cameraqxx/>);
            case "PHOTOWALL":
                return (<PhototWall/>);
            case "NEWCAMERA":
                return (<NewCamera/>);
            case "TRY":
                return (<Try/>);
            case "DrawerMe":
                return (<DrawerMe/>);
            case "Home":
                return (<Home/>);
            case "ActivityList":
                return (<ActivityList/>);
            case "QrcodeReader":
                return (<QrcodeReader/>);
            case "Authorize":
                return (<Authorize/>);
            case "DBPage":
                return (<DBPage/>);
        }
    }
    componentDidMount() {
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
            //点击事件
            console.log("--------------notif", notif)
            // clickNotification(notif);
            // Alert.alert(notif.title);
            singleton.setTitle("Crazy May Fest 2017");
            singleton.setRoute("DrawerMe");
            console.log("singleton—------1", singleton.getRoute());
        });
        this.refreshUnsubscribe = FCM.on('refreshToken', (token) => {
            console.log('----------******', token)
            // fcm token may not be available on first load, catch it here
        });

        FCM.subscribeToTopic('/topics/foo-bar');
        FCM.unsubscribeFromTopic('/topics/foo-bar');

        DeviceEventEmitter.addListener("ReadableMap", info => {
            Alert.alert(info.title);
            // console.log("ReadableMap", info.body);
        });
        // setTimeout(() => {
        //     singleton.getNav().replace({
        //         name: "DrawerMe"
        //     });
        // }, 5000)
    }
    componentWillUnmount() {
        if (isAndroid()) {
            BackAndroid.removeEventListener('hardwareBackPress');
        }

        this.refreshUnsubscribe();
        this.notificationUnsubscribe();
    }
    render() {
        console.log("singleton-------- 2", singleton.getRoute());
        return (
            <View style={styles.navigatorContainer}>
                <Navigator
                    ref={(navigator) => { return this.navigator = navigator } }
                    sceneStyle={styles.container}
                    initialRoute={{ name: singleton.getRoute() == null ? 'Introduce' : singleton.getRoute() }}
                    renderScene={this.renderScene}
                    configureScene={(route) => {
                        return CustomPushFromRightWithoutGestures;
                    } }/>
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
