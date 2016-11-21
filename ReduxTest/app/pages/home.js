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
    PropTypes,
    AsyncStorage
} from 'react-native';
import { Common } from "./common";
import { HardwareUtils } from "../utils/HardwareUtils";
import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';
var Actions = require('react-native-router-flux').Actions;
var data = ["TICKETS","TICKETLIST", "SETTING", "FEEDBACK", "MIC", "NEWMIC", "EVENTINFO", "NEWCAMERA"];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
// This is required for socket.io-client due to a bug in React Native debugger
if (window.navigator && Object.keys(window.navigator).length == 0) {
    window = Object.assign(window, { navigator: { userAgent: 'ReactNative' } });
}

var io = require('socket.io-client/socket.io');

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class Home extends Component {
    constructor(props) {
        super(props);
        const options = { transports: ['websocket'], forceNew: true };
        const socket = io('http://50.18.208.72:30030', options);
        // const socket = io('http://192.168.31.221:3030', options);

        this.state = {
            connected: false,
            dataSource: ds.cloneWithRows(data),
            email: "",
            password: ""
        };

        this.app = feathers()
            .configure(socketio(socket))
            .configure(hooks())
            // Use AsyncStorage to store our login toke
            .configure(authentication({
                storage: AsyncStorage
            }));
    }
    componentDidMount() {
        this.setState({ loading: true });

        this.app.io.on('connect', () => {
            this.setState({ connected: true });

            this.app.authenticate().then(() => {
                this.setState({ loading: false });
                // Actions.main();
            }).catch(error => {
                this.setState({ loading: false });
                // Actions.launch();
            });
        });

        this.app.io.on('disconnect', () => {
            this.setState({ connected: false });
            // Actions.offline();
        });
    }
    login(value, navigator) {
        HardwareUtils.prototype.getAddressIp((call) => {
            this.setState({
                loading: true,
                email: call.IP,
                password: call.IP
            });
            this.app.authenticate({
                type: 'local',
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.setState({ loading: false });
                // re-route to chat app
                // Actions.main();
                this.props.navigator.push({
                    name: value, value: value, nav: navigator, app: this.app, ip: this.state.email
                });
            }).catch(error => {
                console.log('ERROR-1', error);
                // this.setState({ loading: false });
                this.register(value, navigator);
                return;
            });
        });
    }

    register(value, navigator) {
        var self = this;

        this.setState({ loading: true });

        var userData = {
            email: this.state.email,
            password: this.state.password
        };

        this.app.service('users').create(userData).then((result) => {
            this.app.authenticate({
                type: 'local',
                email: this.state.email,
                password: this.state.password
            }).then(response => {
                this.setState({ loading: false });
                this.props.navigator.push({
                    name: value, value: value, nav: navigator, app: this.app, ip: this.state.email
                });
                // re-route to main authorized chat   component
                // Actions.main();
            }).catch(error => {
                console.log('ERROR-2', error);
                this.setState({ loading: false });
            });
        }).catch((err) => {
            console.log('ERROR-3', err);
            self.setState({ loading: false });
        });
    }


    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title} />
                <View style={style.content}>
                    <ListView style={style.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this)} />
                </View>
            </View>
        );
    }
    _row(value) {
        return (
            <View>
                <TouchableOpacity style={style.touch} onPress={this._handerClick.bind(this, value, this.props.navigator)}>
                    <Text style={style.text} >{value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _handerClick(value, navigator) {
        switch (value) {
            case "TICKETS":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "SETTING":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "FEEDBACK":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "MIC":
                this.login(value, navigator);
                break;
            case "NEWMIC":
                this.login(value, navigator);
                break;
            case "EVENTINFO":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "NEWCAMERA":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "TRY":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;

        }
    }

}

Home.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF00',
    },
    content: {
        flex: 6
    },
    touch: {
        marginLeft: 10,
        marginRight: 10,
        height: 70,
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: "#999999"

    },
    text: {
        fontSize: 18,
        color: "#FFFFFF",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: '#00000000'
    },
    list: {
        marginTop: 10
    },
});
