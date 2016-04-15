/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
import React = require("react")
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, TextInput }  from 'react-native';
import {NavigatorClass} from './navigator.android';
import {CommonView} from "./common.android";

export class ChatProject extends Component<{}, {}> {
    render() {
        CommonView.prototype._setPop(this.props.navigator);
        return (
            <View style={style.container}>
                <CommonView/>
                <View style={style.content}>
                    <Text style={style.welcomeText}>
                        在线用户列表
                    </Text>
                    <TextInput style={style.welcomeText}/>
                </View>
            </View>
        );
    }
}
const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    }
    , welcomeText: {
        width: 200,
        height: 40,
        fontSize: 20,
        textAlign: 'left',
        margin: 10,
    },
    rowstyle: {
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: 'red',
        width: 200,
        height: 50
    },
    content: {
        flex: 6
    }
});
