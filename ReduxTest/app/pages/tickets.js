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
    UIManager,
    ScrollView,
    DeviceEventEmitter }  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import { CoverFlow } from 'react-native-pan-controller';
var {height, width} = Dimensions.get('window');
var headImageData = [{ headImageIcon: 'http://192.168.31.221:8081/app/img/171604419.jpg' },
    { headImageIcon: 'http://192.168.31.221:8081/app/img/171604419.jpg' },
    { headImageIcon: 'http://192.168.31.221:8081/app/img/171604419.jpg' },
    { headImageIcon: 'http://192.168.31.221:8081/app/img/171604419.jpg' },
    { headImageIcon: 'http://192.168.31.221:8081/app/img/171604419.jpg' }];
const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Tickets extends Component {
    constructor() {
        super();
        this.state = {
            images: [
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
                require('../img/171604419.jpg'),
            ]
        }
    }
    render() {
        return (
            <CoverFlow style={style.converflow}>
                {this.state.images.map((src, i) => <Image style={{width:100,height:100, marginLeft: -55,}} key={i} source={src} />) }
            </CoverFlow>
        );
    }
}
Tickets.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    content: {
        marginTop: 20,
        width: 350,
        height: 400,
        alignSelf: 'center',
    },
    icon: {
        width: 300,
        height: 300,
        borderRadius: 5,
        alignSelf: 'center',
    },
    scrollview: {
        alignSelf: 'center',
        width: 320,
        height: 300,
    },
    converflow: {
        
    }
});