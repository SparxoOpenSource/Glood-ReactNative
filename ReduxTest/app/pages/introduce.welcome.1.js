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
    DeviceEventEmitter,
    ToastAndroid,
    AlertIOS, }  from 'react-native';
import isAndroid from '../utils/isAndroid.js';
var {height, width} = Dimensions.get('window');
import {fontSizeAndroid} from "../utils/CommonUtils.js";

const propTypes = {
    navigator: PropTypes.object,
    content: PropTypes.string
};
/**
 * 介绍
 */
export class IntroduceWelcomeButton extends Component {
    render() {
        return (
            <Image style={styles.container} source={require('../img/background3.png') }>
                <View style={{ flex: 5 }}>
                    <Text style={styles.slide}>{this.props.content}</Text>
                </View>
                <TouchableOpacity style={{
                    flexDirection: 'row', flex: 1,
                    alignItems: 'center',
                }}
                    onPress={this.go.bind(this) }>
                    <Text style={{
                        backgroundColor: 'transparent',
                        fontSize: fontSizeAndroid(40),
                        color: "#FFFFFF",
                        fontFamily: "ProximaNova-Light",
                        fontWeight: "normal",
                        marginLeft: 36,
                        alignItems: 'center',
                    }}>get started</Text>
                    <Image source={require("../img/go.png") }
                        style={{
                            alignItems: 'center',
                            width: 57,
                            height: 35,
                            marginLeft: 30,
                        }}/>
                </TouchableOpacity>
            </Image>
        );
    }
    go() {
        this.props.navigator.replace({
            name: "Login", value: "Login", nav: this.props.navigator
        });
    }
}

IntroduceWelcomeButton.propTypes = propTypes;

var styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        flexDirection: "column",
        flex: 6
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: fontSizeAndroid(54),
        color: "#103C4D",
        marginTop: 90,
        fontFamily: "ProximaNova-Light",
        marginLeft: 30,
        lineHeight: 72
    },
    image: {
        flex: 1,
        width: width,
        height: height
    }
})