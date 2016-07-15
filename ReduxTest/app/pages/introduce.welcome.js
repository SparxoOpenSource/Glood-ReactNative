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
    content: PropTypes.string
};
/**
 * 介绍
 */
export class IntroduceWelcome extends Component {
    render() {
        return (
            <Image style={styles.container} source={require('../img/background3.png') }>
                <View>
                    <Text style={styles.slide}>{this.props.content}</Text>
                </View>
            </Image>
        );
    }
}

IntroduceWelcome.propTypes = propTypes;

var styles = StyleSheet.create({
    container: {
        height: height,
        width: width,
        flexDirection: "column"
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