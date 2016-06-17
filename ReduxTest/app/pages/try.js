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
    DeviceEventEmitter }  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
var {height, width} = Dimensions.get('window');
var maxSize = 40;
var cha = width - 330;
var leftEvery = 330 / 2 - 70 / 2 + cha / 2;
var currentTime = 0;
var currentTime1 = 0;
const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Try extends Component {
    constructor() {
        super();
        this.state = {
            imageTop: 20,
            imageLeft: leftEvery,
            viewWidth_1: 70,
            viewHeight_1: 70,
            viewTop_1: 20,
            viewLeft_1: leftEvery,
            viewRadius_1: 35,
            viewWidth_2: 70,
            viewHeight_2: 70,
            viewTop_2: 20,
            viewLeft_2: leftEvery,
            viewRadius_2: 35,
            viewOpacity_1: 0,
            viewOpacity_2: 0,
        }
    }
    componentDidMount(props) {
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        // Alert.alert(height + "__" + width);
    }
    render() {
        return (
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', }}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={{
                    height: 110,
                    width: width
                }}>
                    <Image source={require('../img/background.png') } style={{
                        width: 330, height: 70, borderWidth: 0, borderRadius: 35,
                        position: "absolute", marginLeft: cha / 2, marginTop: 20
                    }} />
                    <View style={{
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
                        position: "absolute"
                    }}/>
                    <View style={{
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
                        marginTop: this.state.viewTop_2
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
        this._playAnimOne(5);
        setTimeout(() => {

            this._playAnimTwo(5);
        }, 500);
    }
    _playAnimOne(times) {
        LayoutAnimation.configureNext({
            duration: 1 * 1000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'linear'
            }
        });
        this.setState({
            viewWidth_1: 110,
            viewHeight_1: 110,
            viewTop_1: 0,
            viewLeft_1: leftEvery - maxSize / 2,
            viewRadius_1: this.state.viewHeight_1,
            viewOpacity_2: this.state.viewOpacity_2 + 0.2,
            viewOpacity_1: this.state.viewOpacity_1 + 0.2
        });
        setTimeout(() => {
            currentTime = currentTime + 0.5;
            if (currentTime < times) {
                this._playAnimTwo(times);
            }
            else {
                currentTime = 0;
            }
        }, 500);
        setTimeout(() => {
            this.setState({
                viewWidth_1: 70,
                viewHeight_1: 70,
                viewTop_1: 20,
                viewLeft_1: leftEvery,
                viewRadius_1: this.state.viewHeight_1,
                viewOpacity_2: this.state.viewOpacity_2 - 0.2,
                viewOpacity_1: this.state.viewOpacity_1 - 0.2
            })
        }, 1000);
    }
    _playAnimTwo(times) {
        LayoutAnimation.configureNext({
            duration: 1 * 1000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'linear'
            }
        });
        this.setState({
            viewWidth_2: 110,
            viewHeight_2: 110,
            viewTop_2: 0,
            viewLeft_2: leftEvery - maxSize / 2,
            viewRadius_2: this.state.viewHeight_2,
            viewOpacity_2: this.state.viewOpacity_2 + 0.2,
            viewOpacity_1: this.state.viewOpacity_1 + 0.2
        })
        setTimeout(() => {
            currentTime1 = currentTime1 + 0.5;
            if (currentTime1 < times) {
                this._playAnimOne(times);
            }
            else {
                currentTime1 = 0;
            }
        }, 500);
        setTimeout(() => {
            this.setState({
                viewWidth_2: 70,
                viewHeight_2: 70,
                viewTop_2: 20,
                viewLeft_2: leftEvery,
                viewRadius_2: this.state.viewHeight_2,
                viewOpacity_2: this.state.viewOpacity_2 - 0.2,
                viewOpacity_1: this.state.viewOpacity_1 - 0.2
            })
        }, 1000);
    }
}
Try.propTypes = propTypes;