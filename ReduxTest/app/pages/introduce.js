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
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import Swiper from "react-native-swiper";
import{IntroduceWelcome} from "./introduce.welcome"
var {height, width} = Dimensions.get('window');

const propTypes = {
    navigator: PropTypes.object
};
/**
 * 介绍
 */
export class Introduce extends Component {
    render() {
        return (
            <View>
                <Swiper style={styles.wrapper}
                    dot={<View style={{ backgroundColor: '#46BCBE', width: 50, height: 4, borderRadius: 3, marginLeft: 3, marginRight: 3, }} />}
                    activeDot={<View style={{ backgroundColor: '#21797D', width: 50, height: 4, borderRadius: 3, marginLeft: 3, marginRight: 3 }} />}
                    paginationStyle={{
                        bottom: 46,
                    }}
                    loop={false}
                    onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this) }>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={require("../img/glood_1.jpg") } />
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={require("../img/glood_2.jpg") } />
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={require("../img/glood_3.jpg") } />
                    </View>
                    <View style={styles.slide}>
                        <Image style={styles.image} source={require("../img/glood_4.jpg") } />
                    </View>
                </Swiper>
            </View>
        );
    }
    _onMomentumScrollEnd(e, state, context) {
        console.log(state, context.state)
        // if (isAndroid()) {
        //     ToastAndroid.show(state.index + "", ToastAndroid.SHORT)
        // } else {
        //     AlertIOS.alert(state.index + "");
        // }
        if (state.index === 3) {
            setTimeout(() => {
                this.props.navigator.replace({
                    name: "Login", value: "Login", nav: navigator
                });
            }, 1000);
        }
    }
}

Introduce.propTypes = propTypes;

var styles = StyleSheet.create({
    wrapper: {
        // backgroundColor: '#f00',
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent',
        width: width,
        height: height
    },
    image: {
        flex: 1,
        width: width,
        height: height
    }
})