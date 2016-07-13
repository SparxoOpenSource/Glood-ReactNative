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
    AlertIOS,
    UIManager}  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import Swiper from "react-native-swiper";
import {IntroduceWelcome} from "./introduce.welcome"
import {IntroduceWelcomeButton} from "./introduce.welcome.1"
var {height, width} = Dimensions.get('window');
var index = 0;

const propTypes = {
    navigator: PropTypes.object
};
/**
 * 介绍
 */
export class Introduce extends Component {
    constructor() {
        super();
        this.state = {
            swiperDotColor: "#46BCBE",
            swiperActiveDotColor: "#21797D",
            swiperWidth: 50
        }
    }
    render() {
        return (
            <View>
                <Swiper style={styles.wrapper}
                    dot={<View style={{ backgroundColor: this.state.swiperDotColor, width: this.state.swiperWidth, height: 4, borderRadius: 3, marginLeft: 3, marginRight: 3, }} />}
                    activeDot={<View style={{ backgroundColor: this.state.swiperActiveDotColor, width: this.state.swiperWidth, height: 4, borderRadius: 3, marginLeft: 3, marginRight: 3 }} />}
                    paginationStyle={{
                        bottom: 46,
                    }}
                    loop={false}
                    onMomentumScrollEnd={this._onMomentumScrollEnd.bind(this) }>
                    <View style={styles.slide}>
                        <IntroduceWelcome style={styles.image} content={"Welcome\nto your\ncommunity"}/>
                    </View>
                    <View style={styles.slide}>
                        <IntroduceWelcome style={styles.image} content={"Talk to\nothers\nbefore &\nafter\nthe ebents"}/>
                    </View>
                    <View style={styles.slide}>
                        <IntroduceWelcome style={styles.image} content={"Connect\nwith enemt\norganizers!"}/>
                    </View>
                    <View style={styles.slide}>
                        <IntroduceWelcomeButton style={styles.image} navigator={this.props.navigator} content={"All your\ntickets in\none place!"}/>
                    </View>
                </Swiper>
            </View>
        );
    }
    componentDidMount() {
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

    }
    _onMomentumScrollEnd(e, state, context) {
        console.log(state, context.state)
        if (state.index === 3) {
            LayoutAnimation.configureNext({
                duration: 200,   //持续时间
                create: {
                    type: 'linear',
                    property: 'opacity'
                },
                update: {
                    type: 'linear'
                }
            });
            this.setState({
                swiperWidth: 0,
            });
        } else {
            if (state.index === 2 && index > state.index) {
                LayoutAnimation.configureNext({
                    duration: 200,   //持续时间
                    create: {
                        type: 'linear',
                        property: 'opacity'
                    },
                    update: {
                        type: 'linear'
                    }
                });
                this.setState({
                    swiperWidth: 50,
                });
            }
        }
        index = state.index;
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