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
    DeviceEventEmitter }  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
/**
 * 活动列表
 */
export class Activitylist extends Component {
    render() {
        return "";
    }
}
Activitylist.propTypes = propTypes;