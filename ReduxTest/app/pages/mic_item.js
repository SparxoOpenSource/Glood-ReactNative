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
import {EventListener} from "../listener/EventListener";

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
export class MicItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            w: 70,
            h: 70,
            margin_left: -70,
            isCisClick: false,
            playCode: props.title,
            auto: props.auto
        }
        this._setTime(props.title, props.auto, 2);
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
            <View style={ { justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title, this.props.rowID, 0) } ref="view">
                    <Image source={require('../img/background.png') } style={[style.img2, { width: this.state.w, height: this.state.h }]} />
                    <Image source={require('../img/171604419.jpg') } style={[style.img, { marginLeft: this.state.margin_left }]}  />
                </TouchableOpacity>
                <Text style={style.text}>{
                    this.props.title.ip}</Text>
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
        if (this.state.isCisClick == false) {
            this._playAnim(time);
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
    _setTime(value, auto) {
        setTimeout(() => {
            if (auto)
                this._onPress(value);
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
}

MicItem.propTypes = propTypes;
const style = StyleSheet.create({
    touch: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6,
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
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontFamily: 'MyriadPro-SemiboldIt',
        backgroundColor:'#00000000',
    }
});