import React, {Component} from "react";
import { AppRegistry, StyleSheet, View, Text, ListView, Alert, Navigator, Image, TouchableOpacity, TouchableWithoutFeedback, LayoutAnimation, PropTypes, Animated, Dimensions }  from 'react-native';
import {Common} from "./common";
import {WaveView} from "./waveView";
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class Wave extends Component {
    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <WaveView borderRadius="0" style={{ width: width, height: height }}/>
            </View>
        );
    }
}
Wave.propTypes = propTypes;
var style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    captureButton: {
        paddingTop: 50
    },
});