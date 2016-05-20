import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, PropTypes, AsyncStorage }  from 'react-native';
import {Common} from "./common";
var data = ["MIC", "CAMERA", "NEWCAMERA"];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

import feathers from 'feathers/client'
import hooks from 'feathers-hooks';
import socketio from 'feathers-socketio/client'
import authentication from 'feathers-authentication/client';
var Actions = require('react-native-router-flux').Actions;
import {HardwareUtils} from "../utils/HardwareUtils";

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
        const socket = io('http://192.168.31.162:3030', options);

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
    login(value) {
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
                // Alert.alert('Success', 'Success');
                // re-route to chat app
                // Actions.main();
                this.props.navigator.push({
                    name: value, value: value, nav: navigator, app: this.app
                });
            }).catch(error => {
                console.log('ERROR-1', error);
                // Alert.alert('Error-1', 'Please enter a valid email or password.');
                // this.setState({ loading: false });
                this.register(value);
                return;
            });
        });
    }

    register(value) {
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
                    name: value, value: value, nav: navigator, app: this.app
                });
                // re-route to main authorized chat   component
                // Actions.main();
            }).catch(error => {
                console.log('ERROR-2', error);
                // Alert.alert('Error-2', 'Please enter a valid email or password.');
                this.setState({ loading: false });
            });
        }).catch((err) => {
            console.log('ERROR-3', err);
            self.setState({ loading: false });
            // Alert.alert('Error-3', err.message);
        });
    }


    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={style.content}>
                    <ListView style={style.list}
                        dataSource={this.state.dataSource}
                        renderRow={this._row.bind(this) }/>
                </View>
            </View>
        );
    }
    _row(value) {
        return (
            <View>
                <TouchableOpacity style={style.touch} onPress={this._handerClick.bind(this, value, this.props.navigator) }>
                    <Text style={style.text} >{value}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    _handerClick(value, navigator) {
        switch (value) {
            case "MIC":
                this.login(value);
                break;
            case "CAMERA":
                this.props.navigator.push({
                    name: value, value: value, nav: navigator
                });
                break;
            case "NEWCAMERA":
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
        backgroundColor: '#F5FCFF',
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
        textAlign: "center"
    },
    list: {
        marginTop: 10
    },
});
