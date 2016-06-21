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
var widthh = Dimensions.get('window').width
var heightt = Dimensions.get('window').height
var headImageData = [
    { headImageIcon: 'http://192.168.31.221:8081/app/img/171604419.jpg' },
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
        console.log('----///-----',widthh+'----'+heightt);
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <CoverFlow style={style.converflow}>
                    {this.state.images.map((src, i) => <Image style={{width:widthh*(200/414),height:heightt*(300/736),marginTop:heightt*(80/736),marginLeft:-widthh*(23/414),borderRadius: 5}} key={i} source={src} />) }
                </CoverFlow>
            </View>

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