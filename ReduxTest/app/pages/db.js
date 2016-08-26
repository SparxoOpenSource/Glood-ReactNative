import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, BackAndroid,
    Platform, Dimensions, PropTypes, DeviceEventEmitter, NativeModules}  from 'react-native';
import Button from '@remobile/react-native-simple-button';
import {Add, Select, DeleteMin, Drop, Update, DoTest} from "../utils/DBUtil"

export class DBPage extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Button onPress={DoTest.bind(this) }>测试</Button>
                <Button onPress={Add.bind(this) }>add</Button>
                <Button onPress={DeleteMin.bind(this) }>deleteMin</Button>
                <Button onPress={Update.bind(this) }>update</Button>
                <Button onPress={Drop.bind(this) }>drop</Button>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        paddingVertical: 150,
    },
});