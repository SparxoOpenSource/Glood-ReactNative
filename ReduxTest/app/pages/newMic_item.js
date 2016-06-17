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
    Dimensions
}  from 'react-native';

import {RecordAudio} from "../utils/RecordAudio";
import isAndroid from '../utils/isAndroid.js';
var deviceWidth = Dimensions.get('window').width;
var {height, width} = Dimensions.get('window');
import EventEmitter from "EventEmitter";
import Subscribable  from "Subscribable";
import {EventListener} from "../listener/EventListener";

var currentTime = 0;
var background_imagex = require('../img/background.png');

const propTypes = {
    title: PropTypes.shape({
        name: PropTypes.string,
        ip: PropTypes.string,
        time: PropTypes.number
    }),
    auto: PropTypes.bool,
    rowID: PropTypes.number
};
/**
 * 2表示收到消息自动播放，1表示顺序自动播放，0表示点击播放
 */
export class NewMicItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            background_imagexx: background_imagex,
            w: 70,
            h: 70,
            margin_left: -70,
            head_w: 70,
            head_h: 70,
            head_margin_top: 0,
            head_borderRadius: 35,
            headImageW: 70,
            headImageH: 70,
            headImage_margin_top: 0,
            headImage_borderRadius: 35,
            headImage_opacity: 0,
            headImageW1: 70,
            headImageH1: 70,
            headImage_margin_top1: 0,
            headImage_borderRadius1: 35,
            headImage_opacity1: 0,
            isCisClick: false,
            playCode: props.title,
            auto: props.auto
        }
        this._setTime(props.title.time);
    }
    componentDidMount() {
        EventListener.on("AutoPlayAllRecord").then(this.playFunction.bind(this));
        EventListener.on("AutoPlayState").then(this.changeState.bind(this));
    }
    changeState(auto) {
        this.setState({
            auto: auto
        });
    }
    playFunction(item, rowId) {
        if (rowId > this.props.rowID) {
            if (this.state.isCisClick === false) {
                this._playAnim(this.props.title.time);
            }
        } else {
            rowId = rowId + 1;
            if (rowId === this.props.rowID)
                this._onPress(this.props.title, this.props.rowID);
        }
    }
    render() {
        return (
            <View style={ { justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title, this.props.rowID, 0) } ref="view">
                    <Image source={this.state.background_imagexx} style={[style.img2, { width: this.state.w, height: this.state.h }]} />
                    <View style={[style.img3, {
                        width: this.state.headImageW, height: this.state.headImageH, marginLeft: this.state.headImage_margin_left,
                        marginTop: this.state.headImage_margin_top, borderRadius: this.state.headImage_borderRadius, opacity: this.state.headImage_opacity
                    }]} />
                    <View style={[style.img3, {
                        width: this.state.headImageW1, height: this.state.headImageH1, marginLeft: this.state.headImage_margin_left1,
                        marginTop: this.state.headImage_margin_top1, borderRadius: this.state.headImage_borderRadius1, opacity: this.state.headImage_opacity1
                    }]} />
                    <Image source={require('../img/171604419.jpg') } style={[style.img, {
                        marginLeft: this.state.margin_left, marginTop: this.state.head_margin_top
                        , width: this.state.head_w, height: this.state.head_h, borderRadius: this.state.head_borderRadius
                    }]}  />
                </TouchableOpacity>
                <Text style={style.text}></Text>
            </View>
        );
    }

    _onPress(value, rowId, bool) {
        if (bool === 1 && this.state.isCisClick)
            return
        var title = value.name;
        var time = value.time;
        if (time <= 0) {
            RecordAudio.prototype.recordMsg("播放失败");
            EventListener.trigger("AutoPlayAllRecord", value, rowId, 1);
            return;
        }
        this._rippleAnima(time);
        if (this.state.isCisClick == false) {
            // this._playAnim(time);
        }
        this._play(value, rowId, bool);
    }

    /**
     * 播放声音 
     * */
    _play(value, rowId, bool) {
        var _this = this;
        RecordAudio.prototype.playRecord(value.name, (back) => {
            if (bool !== 1)
                // RecordAudio.prototype.recordMsg(back.name);
                if (_this.state.auto) {
                    EventListener.trigger("AutoPlayAllRecord", value, rowId, 1);
                }
        });
    }
    /**
     * 设置延迟时间
     */
    _setTime(value) {
        setTimeout(() => {
            this._playAnim(value);
            this.setState({
                headImage_margin_left: (-70 - this.state.w) / 2,
                headImage_margin_left1: (-70 - this.state.w) / 2,
            })
        }, 100);
    }

    _rippleAnima(time) {
        this._headAnim(time);
        this._headImageAnimaBig();
    }

    _headImageAnimaBig() {
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

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
        background_imagex = require('../img/background_red.png')
        this.setState({
            background_imagexx: background_imagex,
            head_w: this.state.head_w + 10,
            head_h: this.state.head_h + 10,
            margin_left: this.state.margin_left - 5,
            head_margin_top: - 10 / 2,
            head_borderRadius: this.state.head_w / 2,
        })
    }

    _headImageAnimaSmall() {
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

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
        background_imagex = require('../img/background.png');
        this.setState({
            background_imagexx: background_imagex,
            head_w: 70,
            head_h: 70,
            margin_left: this.state.margin_left + 5,
            head_margin_top: 0,
            head_borderRadius: 35,
        })
    }

    _headAnim(timesss) {
        var maxSize = 50;
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

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
            headImageW: this.state.headImageW + maxSize,
            headImageH: this.state.headImageH + maxSize,
            headImage_borderRadius: (this.state.headImageW + maxSize / 2) / 2,
            headImage_margin_left: (-70 - this.state.w) / 2 - 25,
            headImage_margin_top: - maxSize / 2,
            headImage_opacity: 0.2,
        })
        setTimeout(() => {
            console.log("1111111111111111");
            currentTime = currentTime + 0.5;
            console.log("xxxxxxxxxxxx", currentTime + "**" + timesss);
            if (currentTime < timesss) {
                this._head1Anim(timesss);
            }
            else {
                currentTime = 0;
                //头像还原
                setTimeout(() => {
                    this._headImageAnimaSmall();
                }, 500);
            }
        }, 500);
        setTimeout(() => {
            console.log("222222222222222222");
            this.setState({
                headImageW: 70,
                headImageH: 70,
                headImage_margin_left: (-70 - this.state.w) / 2,
                headImage_margin_top: 0,
                headImage_borderRadius: 35,
                headImage_opacity: 0
            })
        }, 1000);
    }

    _head1Anim(timess) {
        var maxSize = 50;
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }

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
            headImageW1: this.state.headImageW1 + maxSize,
            headImageH1: this.state.headImageH1 + maxSize,
            headImage_borderRadius1: (this.state.headImageH1 + maxSize / 2) / 2,
            headImage_margin_left1: (-70 - this.state.w) / 2 - 25,
            headImage_margin_top1: - maxSize / 2,
            headImage_opacity1: 0.2,
        })
        setTimeout(() => {
            console.log("33333333333333333");
            currentTime = currentTime + 0.5;
            console.log("YYYYYYYYYYYYY", currentTime + "**" + timess);
            if (currentTime < timess) {
                this._headAnim(timess);
            }
            else {
                currentTime = 0;
                //头像还原
                setTimeout(() => {
                    this._headImageAnimaSmall();
                }, 500);
            }
        }, 500);
        setTimeout(() => {
            console.log("44444444444444444");
            this.setState({
                headImageW1: 70,
                headImageH1: 70,
                headImage_margin_left1: (-70 - this.state.w) / 2,
                headImage_margin_top1: 0,
                headImage_borderRadius1: 35,
                headImage_opacity1: 0
            })
        }, 1000);
    }

    _playAnim(time) {

        var wid = deviceWidth - 20 - 70;
        var show_width;
        if (time >= 20) {
            show_width = wid - 35;
        } else {
            show_width = (wid - 70) / 20 * time + 70;
        }
        this.setState({
            w: this.state.w + show_width,
            h: this.state.h,
            margin_left: this.state.margin_left - show_width / 2,
            isCisClick: true
        })
    }
}

NewMicItem.propTypes = propTypes;
const style = StyleSheet.create({
    touch: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6,
        width: 320,
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
    img3: {
        borderWidth: 0,
        borderRadius: 35,
        position: "absolute",
        alignItems: 'center',
        backgroundColor: "green"
    },
    img2: {
        borderWidth: 0,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontFamily: 'MyriadPro-SemiboldIt',
    }
});