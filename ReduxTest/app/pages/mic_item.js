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

const propTypes = {
    title: PropTypes.string
};

export class MicItem extends Component {
    constructor() {
        super();
        this.state = {
            w: 70,
            h: 70,
            margin_left: -70
        }
    }

    render() {
        return (
            <View style={ { justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title) } ref="view">
                    <Image source={{ uri: "http://192.168.31.162:8081/app/img/background.png" } } style={[style.img2, { width: this.state.w, height: this.state.h }]} />
                    <Image source={{ uri: "http://192.168.31.162:8081/app/img/19.jpg" } } style={[style.img, { marginLeft: this.state.margin_left }]}  />
                </TouchableOpacity>
                <Text style={style.text}>YoYo+{this.props.title.split("&")[1]}</Text>
            </View>
        );
    }

    _onPress(value) {
        var title = value.split("&")[0];
        var time = value.split("&")[1];
        if (time == "" || time == null || time <= 0) {
            RecordAudio.prototype.recordMsg("播放失败");
            return;
        }
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
        //Alert.alert(width + "-------" + deviceWidth + "------" + show_width + "------------" + time);
        this.setState({
            w: this.state.w + show_width,
            h: this.state.h,
            margin_left: this.state.margin_left - show_width / 2
        })
        this._play(title);
    }

    //播放声音
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            RecordAudio.prototype.recordMsg(back.name);
        });
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