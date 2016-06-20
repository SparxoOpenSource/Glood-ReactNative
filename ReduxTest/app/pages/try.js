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
    Easing,
    DeviceEventEmitter }  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
var {height, width} = Dimensions.get('window');
var maxSize = 60;
var cha = width - 330;
var leftEvery = 330 / 2 - 70 / 2 + cha / 2;
var currentTime = 0;
var currentTime1 = 0;
var _animateHandler;
var _animateHandler2;
var viewOpacity_1 = new Animated.Value(0.3);
var viewOpacity_2 = new Animated.Value(0.3);
var runBool_1 = false;
var runBool_2 = false;
const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Try extends Component {
    constructor() {
        super();
        this.state = {
            imageTop: maxSize / 2,
            imageLeft: leftEvery,
            viewWidth_1: 70,
            viewHeight_1: 70,
            viewTop_1: maxSize / 2,
            viewLeft_1: leftEvery,
            viewRadius_1: 35,
            viewWidth_2: 70,
            viewHeight_2: 70,
            viewTop_2: maxSize / 2,
            viewLeft_2: leftEvery,
            viewRadius_2: 35,
            viewOpacity_1: viewOpacity_1,
            viewOpacity_2: viewOpacity_2,
            bounceValue_1: new Animated.Value(1),
            bounceValue_2: new Animated.Value(1),
        }
    }
    componentDidMount() {
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    render() {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', }}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={{
                    height: 70 + maxSize,
                    width: width
                }}>
                    <Image source={require('../img/background.png') } style={{
                        width: 330, height: 70, borderWidth: 0, borderRadius: 35,
                        position: "absolute", marginLeft: cha / 2, marginTop: maxSize / 2
                    }} />
                    <Animated.View style={{
                        width: this.state.viewWidth_1,
                        height: this.state.viewHeight_1,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_1,
                        backgroundColor: "green",
                        opacity: this.state.viewOpacity_1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: this.state.viewLeft_1,
                        marginTop: this.state.viewTop_1,
                        position: "absolute",
                        transform: [{ scale: this.state.bounceValue_1 }]
                    }}/>
                    <Animated.View style={{
                        width: this.state.viewWidth_2,
                        height: this.state.viewHeight_2,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_2,
                        backgroundColor: "green",
                        opacity: this.state.viewOpacity_2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: "absolute",
                        marginLeft: this.state.viewLeft_2,
                        marginTop: this.state.viewTop_2,
                        transform: [{ scale: this.state.bounceValue_2 }]
                    }}/>
                    <TouchableOpacity style={{
                        width: 70, height: 70,
                        borderWidth: 0,
                        borderRadius: 35,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: "absolute",
                        marginLeft: this.state.imageLeft,
                        marginTop: this.state.imageTop
                    }} onPress={this._onPress.bind(this) } ref="view">
                        <Image source={require('../img/171604419.jpg') } style={{ width: 70, height: 70, borderWidth: 0, borderRadius: 35 }}  />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onPress() {
        this._playAnimOne(10);
    }
    _playAnimOne(times) {
        currentTime = currentTime + 0.5;
        if (currentTime >= times) {
            currentTime = 0;
            return;
        }

        _animateHandler = Animated.parallel([
            Animated.timing(this.state.bounceValue_1, {
                toValue: 1.8,  //透明度动画最终值
                duration:800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            }),
            Animated.timing(this.state.viewOpacity_1, {
                toValue: 0,  //透明度动画最终值
                duration:800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            })
        ]);
        this.state.viewOpacity_1.addListener((callback) => {
            if (callback.value > 0.1) {
                runBool_1 = false;
            } else if (callback.value <= 0.1) {
                if (runBool_1 === false) {
                    this._playAnimTwo(10);
                    runBool_1 = true;
                }
            }
            if (callback.value === 0) {
                this.setState({
                    viewWidth_1: 70,
                    viewHeight_1: 70,
                    viewTop_1: maxSize / 2,
                    viewLeft_1: leftEvery,
                    viewRadius_1: this.state.viewHeight_1,
                    viewOpacity_1: new Animated.Value(0.3),
                    bounceValue_1: new Animated.Value(1),
                })
            }
        });
        _animateHandler.start && _animateHandler.start();
    }
    _playAnimTwo(times) {
        currentTime = currentTime + 0.5;
        if (currentTime >= times) {
            currentTime = 0;
            return;
        }
        _animateHandler2 = Animated.parallel([
            Animated.timing(this.state.bounceValue_2, {
                toValue: 1.8,  //透明度动画最终值
                duration:800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            }),
            Animated.timing(this.state.viewOpacity_2, {
                toValue: 0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            })
        ]);

        this.state.viewOpacity_2.addListener(callback => {
            console.log("this.state.viewOpacity_2", callback.value);
            if (callback.value > 0.1) {
                runBool_2 = false;
            } else if (callback.value <= 0.1) {
                if (runBool_2 === false) {
                    this._playAnimOne(10);
                    runBool_2 = true;
                }
            }
            if (callback.value === 0) {
                this.setState({
                    viewWidth_2: 70,
                    viewHeight_2: 70,
                    viewTop_2: maxSize / 2,
                    viewLeft_2: leftEvery,
                    viewRadius_2: this.state.viewHeight_1,
                    viewOpacity_2: new Animated.Value(0.3),
                    bounceValue_2: new Animated.Value(1),
                })
            }
        });
        _animateHandler2.start && _animateHandler2.start();
    }
}
Try.propTypes = propTypes;