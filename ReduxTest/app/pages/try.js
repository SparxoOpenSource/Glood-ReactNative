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
var maxSize = 40;
var currentTime = 0;
const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Try extends Component {
    constructor() {
        super();
        this.state = {
            imageTop: -70,
            viewWidth_1: 70,
            viewHeight_1: 70,
            viewTop_1: -70,
            viewRadius_1: 35,
            viewWidth_2: 70,
            viewHeight_2: 70,
            viewTop_2: -70,
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
    }
    render() {
        return (
            <View style={{ flex: 7, flexDirection: 'column', justifyContent: 'space-between', backgroundColor: 'white', }}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 6 }}>
                    <Image source={require('../img/background.png') } style={{ width: 330, height: 70, borderWidth: 0, borderRadius: 35 }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: this.state.viewTop_1 }}>
                        <View style={{
                            width: this.state.viewWidth_1,
                            height: this.state.viewHeight_1,
                            borderWidth: 0,
                            borderRadius: this.state.viewRadius_1,
                            backgroundColor: "#999999",
                            opacity: this.state.viewOpacity_1
                        }}></View>
                        <View style={{
                            width: this.state.viewWidth_2,
                            height: this.state.viewHeight_2,
                            borderWidth: 0,
                            borderRadius: this.state.viewRadius_2,
                            backgroundColor: "#999999",
                            marginTop: this.state.viewTop_2,
                            opacity: this.state.viewOpacity_2
                        }}></View>
                    </View>
                    <TouchableOpacity style={{ width: 70, height: 70, borderWidth: 0, borderRadius: 35, alignItems: 'center', marginTop: this.state.imageTop }} onPress={this._onPress.bind(this) } ref="view">
                        <Image source={require('../img/171604419.jpg') } style={{ width: 70, height: 70, borderWidth: 0, borderRadius: 35 }}  />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _onPress() {
        this._playAnimOne(5);
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
            imageTop: this.state.imageTop,
            viewWidth_1: this.state.viewWidth_1 + maxSize,
            viewHeight_1: this.state.viewHeight_1 + maxSize,
            viewTop_1: this.state.viewTop_1 - maxSize / 2,
            viewRadius_1: this.state.viewHeight_1,
            viewTop_2: this.state.viewTop_2 - maxSize / 2,
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
                imageTop: this.state.imageTop,
                viewWidth_1: this.state.viewWidth_1 - maxSize,
                viewHeight_1: this.state.viewHeight_1 - maxSize,
                viewTop_1: this.state.viewTop_1 + maxSize / 2,
                viewRadius_1: this.state.viewHeight_1,
                viewTop_2: this.state.viewTop_2 + maxSize / 2,
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
            imageTop: this.state.imageTop,
            viewWidth_2: this.state.viewWidth_2 + maxSize,
            viewHeight_2: this.state.viewHeight_2 + maxSize,
            viewTop_2: this.state.viewTop_2 - maxSize / 2,
            viewRadius_2: this.state.viewHeight_2,
            viewTop_1: this.state.viewTop_1 - maxSize / 2,
            viewOpacity_2: this.state.viewOpacity_2 + 0.2,
            viewOpacity_1: this.state.viewOpacity_1 + 0.2
        })
        setTimeout(() => {
            currentTime = currentTime + 0.5;
            if (currentTime < times) {
                this._playAnimOne(times);
            }
            else {
                currentTime = 0;
            }
        }, 500);
        setTimeout(() => {
            this.setState({
                imageTop: this.state.imageTop,
                viewWidth_2: this.state.viewWidth_2 - maxSize,
                viewHeight_2: this.state.viewHeight_2 - maxSize,
                viewTop_2: this.state.viewTop_2 + maxSize / 2,
                viewRadius_2: this.state.viewHeight_2,
                viewTop_1: this.state.viewTop_1 + maxSize / 2,
                viewOpacity_2: this.state.viewOpacity_2 - 0.2,
                viewOpacity_1: this.state.viewOpacity_1 - 0.2
            })
        }, 1000);
    }
}
Try.propTypes = propTypes;