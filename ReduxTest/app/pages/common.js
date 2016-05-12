import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, ScrollView, TouchableOpacity, Image, NativeModules, PropTypes}  from 'react-native';
var _navigator;
var _title = "我是导航";

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class Common extends Component {
    render() {
        return (
            <View>
                <View style = {styles.view}>
                    <TouchableOpacity onPress={this._onBack.bind(this) }>
                        <Image source={require('../img/back.png') } style={styles.ImagStyle}  />
                    </TouchableOpacity>
                    <Text style={styles.TextStyle}>{this.props.title}</Text>
                    <TouchableOpacity>
                        <Image source={require('../img/none.png') } style={styles.ImagStyle}  />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onBack() {
        this.props.navigator.pop();
    }
}
Common.PropTypes = propTypes;
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#999999',
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    ImagStyle: {
        width: 26,
        height: 26,
    },
    TextStyle: {
        fontSize: 18,
        color: '#FFFFFF',
    }
});