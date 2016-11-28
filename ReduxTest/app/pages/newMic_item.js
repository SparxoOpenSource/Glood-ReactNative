import React, { Component } from "react";
import {
    AppRegistry,
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
    Dimensions,
    Animated,
    Easing,
} from 'react-native';

import { RecordAudio } from "../utils/RecordAudio";
import { Dialog } from "../utils/Dialog";
import { EventListener } from "../listener/EventListener";
import isAndroid from '../utils/isAndroid.js';
import EventEmitter from "EventEmitter";
import Subscribable from "Subscribable";
var deviceWidth = Dimensions.get('window').width;
var { height, width } = Dimensions.get('window');
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var maxHeight = height - Navigator.NavigationBar.Styles.General.NavBarHeight - STATUS_BAR_HEIGHT - 64;
var maxSize = isAndroid() ? 30 : 35;
var cha = width - 60;
var leftEvery = 60 / 2 - 60 / 2 + cha / 2;
var currentTime = 0;
var currentTime1 = 0;
var _animateHandler;
var _animateHandler2;
var viewOpacity_1 = new Animated.Value(0.3);
var viewOpacity_2 = new Animated.Value(0.3);
var runBool_1 = false;
var runBool_2 = false;

const propTypes = {
    title: PropTypes.shape({
        name: PropTypes.string,
        ip: PropTypes.string,
        time: PropTypes.number
    }),
    auto: PropTypes.bool,
    rowID: PropTypes.number,
    dateLength: PropTypes.number
};
/**
 * 2表示收到消息自动播放，1表示顺序自动播放，0表示点击播放
 */
export class NewMicItem extends Component {
    /**
     * 声明props属性
     */
    static propTypes = {
        isWillFilterPeople: React.PropTypes.bool.isRequired,
    }
    constructor(props) {
        super(props);

        currentTime = 0;
        currentTime1 = 0;
        viewOpacity_1 = new Animated.Value(0.3);
        viewOpacity_2 = new Animated.Value(0.3);
        runBool_1 = false;
        runBool_2 = false;
        this.state = {
            w: 60,
            h: 60,
            left: cha / 2,
            imageTop: maxSize / 2,
            imageLeft: leftEvery,
            viewWidth_1: 60,
            viewHeight_1: 60,
            viewTop_1: maxSize / 2,
            viewLeft_1: leftEvery,
            viewRadius_1: 30,
            viewWidth_2: 60,
            viewHeight_2: 60,
            viewTop_2: maxSize / 2,
            viewLeft_2: leftEvery,
            viewRadius_2: 30,
            viewOpacity_1: viewOpacity_1,
            viewOpacity_2: viewOpacity_2,
            bounceValue_1: new Animated.Value(1),
            bounceValue_2: new Animated.Value(1),
            bounceValue_3: new Animated.Value(1),
            isCisClick: false,
            playCode: props.title,
            auto: props.auto,
            imgIsBig: false,
            background_imagex: require('../img/background.png'),
            firstTop: props.rowID === 0 ? ((props.dateLength * (60 + maxSize)) > maxHeight ? 0 : (maxHeight - 60 - maxSize)) : 0
        }
        this._setTime(props.title.time);
    }
    componentDidMount() {
        EventListener.on("AutoPlayState").then(this.changeState.bind(this));
        EventListener.on("firstTop").then(this.firstTopMargin.bind(this));
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
    }
    firstTopMargin(number) {
        if (this.props.rowID === 0) {
            var temp = number * (60 + maxSize);
            if (maxHeight > temp) {
                this.setState({
                    firstTop: maxHeight - temp
                });
            }
        }
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
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    height: 60 + maxSize,
                    width: width,
                    marginTop: this.state.firstTop
                }}>
                    <Image source={this.state.background_imagex} style={{
                        width: this.state.w, height: this.state.h, borderWidth: 0, borderRadius: 30,
                        position: "absolute", marginLeft: this.state.left, marginTop: maxSize / 2
                    }} />
                    <Animated.View style={{
                        width: this.state.viewWidth_1,
                        height: this.state.viewHeight_1,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_1,
                        backgroundColor: "white",
                        opacity: this.state.viewOpacity_1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: this.state.viewLeft_1,
                        marginTop: this.state.viewTop_1,
                        position: "absolute",
                        transform: [{ scale: this.state.bounceValue_1 }]
                    }} />
                    <Animated.View style={{
                        width: this.state.viewWidth_2,
                        height: this.state.viewHeight_2,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_2,
                        backgroundColor: "white",
                        opacity: this.state.viewOpacity_2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: "absolute",
                        marginLeft: this.state.viewLeft_2,
                        marginTop: this.state.viewTop_2,
                        transform: [{ scale: this.state.bounceValue_2 }]
                    }} />
                    <TouchableOpacity style={{
                        width: 60, height: 60,
                        borderWidth: 0,
                        borderRadius: 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: "absolute",
                        marginLeft: this.state.imageLeft,
                        marginTop: this.state.imageTop,
                        transform: [{ scale: this.state.bounceValue_3 }]
                    }} onPress={this._onPress.bind(this, this.props.title, this.props.rowID, 0)} ref="view">
                        <Animated.Image source={require('../img/171604419.jpg')} style={{
                            width: 60,
                            height: 60,
                            borderWidth: 0,
                            borderRadius: 30
                        }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    _dialogCallback() {

    }
    _onPress(value, rowId, bool) {
        if (bool === 1 && this.state.isCisClick)
            return;
        //处于屏蔽人员状态，需要屏蔽该对话的人员
        console.log("_onPress,this.props.isWillFilterPeople:", this.props.isWillFilterPeople);
        if (this.props.isWillFilterPeople) {
          
            this.refs.dialog.show("确定要取消订单吗");
            return;
        }
        var title = value.name;
        var time = value.time;
        if (time <= 0) {
            RecordAudio.prototype.recordMsg("播放失败");
            // EventListener.trigger("AutoPlayAllRecord", value, rowId, 1);
            return;
        }
        this._playAnimOne(time);
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
                    // EventListener.trigger("AutoPlayAllRecord", value, rowId, 1);
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
                headImage_margin_left: (-60 - this.state.w) / 2,
                headImage_margin_left1: (-60 - this.state.w) / 2,
            })
        }, 100);
    }
    /**
     * 计算声音播放长度，赋值给背景
     */
    _playAnim(time) {
        var show_width = 0;
        var wid = deviceWidth - 20 - 60;
        if (time >= 20) {
            show_width = wid - 30;
        } else {
            show_width = (wid - 60) / 20 * time + 60;
        }
        var cha = width - this.state.w - show_width;
        var leftEvery = (this.state.w + show_width) / 2 - 60 / 2 + cha / 2;
        this.setState({
            w: this.state.w + show_width,
            h: this.state.h,
            left: cha / 2,
            imageLeft: leftEvery,
            viewLeft_1: leftEvery,
            viewLeft_2: leftEvery,
        })
    }

    /**
     * 第一个声波动画
     */
    _playAnimOne(times) {
        this._dillImgBig();
        currentTime = currentTime + 0.5;
        if (currentTime >= times) {
            currentTime = 0;
            this._dillImgSmall();
            return;
        }
        _animateHandler = Animated.parallel([
            Animated.timing(this.state.bounceValue_1, {
                toValue: 2.0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            }),
            Animated.timing(this.state.viewOpacity_1, {
                toValue: 0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            })
        ]);
        this.state.viewOpacity_1.addListener((callback) => {
            if (callback.value > 0.1) {
                runBool_1 = false;
            } else if (callback.value <= 0.1) {
                if (runBool_1 === false) {
                    this._playAnimTwo(times);
                    runBool_1 = true;
                }
            }
            if (callback.value === 0) {
                this.setState({
                    viewWidth_1: 60,
                    viewHeight_1: 60,
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
    /**
     * 第二个声波动画
     */
    _playAnimTwo(times) {
        currentTime = currentTime + 0.5;
        if (currentTime >= times) {
            currentTime = 0;
            this._dillImgSmall();
            return;
        }
        _animateHandler2 = Animated.parallel([
            Animated.timing(this.state.bounceValue_2, {
                toValue: 2.0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            }),
            Animated.timing(this.state.viewOpacity_2, {
                toValue: 0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            })
        ]);

        this.state.viewOpacity_2.addListener(callback => {
            if (callback.value > 0.1) {
                runBool_2 = false;
            } else if (callback.value <= 0.1) {
                if (runBool_2 === false) {
                    this._playAnimOne(times);
                    runBool_2 = true;
                }
            }
            if (callback.value === 0) {
                this.setState({
                    viewWidth_2: 60,
                    viewHeight_2: 60,
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
    /**
     * 放大头像动画
     */
    _headImageAnimaBig() {
        Animated.timing(this.state.bounceValue_3, {
            toValue: 1.2,  //透明度动画最终值
            duration: 300,   //动画时长3000毫秒
            easing: Easing.linear  //缓动函数
        }).start();
    }
    /**
     * 缩小头像动画
     */
    _headImageAnimaSmall() {
        this.setState({
            bounceValue_3: new Animated.Value(1.2)
        });
        Animated.timing(this.state.bounceValue_3, {
            toValue: 1,  //透明度动画最终值
            duration: 300,   //动画时长3000毫秒
            easing: Easing.linear  //缓动函数
        }).start();
    }
    /**
     * 放大头像 
     */
    _dillImgBig() {
        if (this.state.imgIsBig === false) {
            this._headImageAnimaBig();
            this.setState({
                imgIsBig: true,
                background_imagex: require('../img/background2.png')
            });
            EventListener.trigger("PlayState", false);
        }
    }
    /**
     * 缩小头像
     */
    _dillImgSmall() {
        if (this.state.imgIsBig === true) {
            this._headImageAnimaSmall();
            this.setState({
                imgIsBig: false,
                background_imagex: require('../img/background.png')
            });
            EventListener.trigger("PlayState", true);
        }
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
        borderRadius: 30,
        backgroundColor: "#99999900",
        justifyContent: 'center',
        alignItems: 'center'
    },
    touch2: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#99999950",
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 60,
        height: 60,
        borderWidth: 0,
        borderRadius: 30,
        position: "absolute",
        alignItems: 'center'
    },
    img3: {
        borderWidth: 0,
        borderRadius: 30,
        position: "absolute",
        alignItems: 'center',
        backgroundColor: "green"
    },
    img2: {
        borderWidth: 0,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontFamily: 'ProximaNova-Semibold',
    }
});