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
    UIManager,
    Dimensions}  from 'react-native';

import {RecordAudio} from "../utils/RecordAudio";
import isAndroid from '../utils/isAndroid.js';
var deviceWidth = Dimensions.get('window').width;
var {height, width} = Dimensions.get('window');
import EventEmitter from "EventEmitter";
import Subscribable  from "Subscribable";

const propTypes = {
    title: PropTypes.string,
    auto: PropTypes.bool,
    events: PropTypes.object
};

export class MicItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            w: 70,
            h: 70,
            margin_left: -70,
            isCisClick: false,
            playCode: props.title
        }
        // this._setTime(props.title, props.auto);
    }
    componentDidMount() {
        // console.log("999999",this.props.events);
        this.addListenerOn(this.props.events, 'myRightBtnEvent', this.miscFunction.bind(this));
    }

    miscFunction(args) {
        console.log("收到消息", this.state.title);
    }
    render() {
        if (this.props.title.split("&").length > 1) {
            return (
                <View style={ { justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title) } ref="view">
                        <Image source={require('../img/background.png') } style={[style.img2, { width: this.state.w, height: this.state.h }]} />
                        <Image source={require('../img/171604419.jpg') } style={[style.img, { marginLeft: this.state.margin_left }]}  />
                    </TouchableOpacity>
                    <Text style={style.text}>{
                        this.props.title.split("&")[1]}+{this.props.title.split("&")[2]}</Text>
                </View>
            );
        } else {
            return (
                <View style={ { justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                    <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title) } ref="view">
                        <Image source={require('../img/background.png') } style={[style.img2, { width: this.state.w, height: this.state.h }]} />
                        <Image source={require('../img/171604419.jpg') } style={[style.img, { marginLeft: this.state.margin_left }]}  />
                    </TouchableOpacity>
                    <Text style={style.text}>{this.props.title}</Text>
                </View>
            );
        }
    }

    _onPress(value) {
        var title = value.split("&")[0];
        var time = value.split("&")[2];
        if (time == "" || time == null || time <= 0) {
            RecordAudio.prototype.recordMsg("播放失败");
            return;
        }
        if (this.state.isCisClick == false) {
            var wid = deviceWidth - 20 - 70;
            var show_width;
            if (time >= 20) {
                show_width = wid - 35;
            } else {
                show_width = (wid - 70) / 20 * time + 70;
            }
            if (isAndroid()) {
                //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
                UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
            }
            LayoutAnimation.configureNext({

                duration: time * 1000,   //持续时间
                create: {
                    type: 'linear',
                    property: 'opacity'
                },
                update: {
                    type: 'linear'
                }
            });
            this.setState({
                w: this.state.w + show_width,
                h: this.state.h,
                margin_left: this.state.margin_left - show_width / 2,
                isCisClick: true
            })
        }
        this._play(title);
    }

    /**
     * 播放声音 
     * */
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            RecordAudio.prototype.recordMsg(back.name);
        });
    }
    /**
     * 设置延迟时间
     */
    _setTime(value, auto) {
        setTimeout(() => {
            if (auto)
                this._onPress(value);
        }, 1000);
    }
    _newPlay(value) {
        // this.setState({
        //     w: 70,
        //     h: 70,
        //     margin_left: -70,
        //     isCisClick: false
        // })
        // this._onPress(value);
        Alert.alert("erbi");
    }
}

MicItem.propTypes = propTypes;
const style = StyleSheet.create({
    touch: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
        width: 320,
        height: 70,
        flexDirection: "row",
        borderRadius: 35,
        backgroundColor: "#99999900",
        justifyContent: 'center',
        alignItems: 'center'
    },
    touch2: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#99999950",
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 70,
        height: 70,
        borderWidth: 0,
        borderRadius: 35,
        position: "absolute",
        alignItems: 'center'
    },
    img2: {
        borderWidth: 0,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 14,
        justifyContent: 'center',
        alignItems: 'center'
    }
});