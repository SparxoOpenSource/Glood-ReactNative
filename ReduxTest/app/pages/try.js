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
var currentTime1 = 0;
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
                    <View style={{
                        width: this.state.viewWidth_1,
                        height: this.state.viewHeight_1,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_1,
                        backgroundColor: "#999999",
                        opacity: this.state.viewOpacity_1,
                        marginTop: this.state.viewTop_1
                    }}/>
                    <View style={{
                        width: this.state.viewWidth_2,
                        height: this.state.viewHeight_2,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_2,
                        backgroundColor: "#999999",
                        marginTop: this.state.viewTop_2,
                        opacity: this.state.viewOpacity_2
                    }}/>
                    <TouchableOpacity style={{ width: 70, height: 70, borderWidth: 0, borderRadius: 35, alignItems: 'center', marginTop: this.state.imageTop }} onPress={this._onPress.bind(this) } ref="view">
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
            duration: 0.5 * 1000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'linear'
            }
        });
        this.setState({
            imageTop: -90,
            viewWidth_1: 110,
            viewHeight_1: 110,
            viewTop_1: -90,
            viewRadius_1: 55,
            viewTop_2: -90,
            viewOpacity_2: this.state.viewOpacity_2 + 0.2,
            viewOpacity_1: this.state.viewOpacity_1 + 0.2
        });
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
                imageTop: -70,
                viewWidth_1: 70,
                viewHeight_1: 70,
                viewTop_1: -70,
                viewRadius_1: 35,
                viewTop_2: -70,
                viewOpacity_2: this.state.viewOpacity_2 - 0.2,
                viewOpacity_1: this.state.viewOpacity_1 - 0.2
            })
        }, 500);
    }
    _playAnimTwo(times) {
        LayoutAnimation.configureNext({
            duration: 0.6 * 1000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'linear'
            }
        });
        this.setState({
            imageTop: -90,
            viewWidth_2: 110,
            viewHeight_2: 110,
            viewTop_2: -90,
            viewRadius_2: 55,
            viewTop_1: -90,
            viewOpacity_2: this.state.viewOpacity_2 + 0.2,
            viewOpacity_1: this.state.viewOpacity_1 + 0.2
        })
        setTimeout(() => {
            currentTime1 = currentTime1 + 0.6;
            if (currentTime1 < times) {
                this._playAnimTwo(times);
            }
            else {
                currentTime1 = 0;
            }
        }, 600);
        setTimeout(() => {
            this.setState({
                imageTop: -70,
                viewWidth_2: 70,
                viewHeight_2: 70,
                viewTop_2: -70,
                viewRadius_2: 35,
                viewTop_1: -70,
                viewOpacity_2: this.state.viewOpacity_2 - 0.2,
                viewOpacity_1: this.state.viewOpacity_1 - 0.2
            })
        }, 600);
    }
}
Try.propTypes = propTypes;