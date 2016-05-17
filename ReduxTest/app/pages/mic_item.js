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
    UIManager}  from 'react-native';

import {RecordAudio} from "../utils/RecordAudio";
import isAndroid from '../utils/isAndroid.js';

const propTypes = {
    title: PropTypes.string
};

export class MicItem extends Component {
    constructor() {
        super();
        this.state = {
            w: 70,
            h: 70
        }
    }

    render() {
        return (
            <View style={ { justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={style.touch} onPress={this._onPress.bind(this, this.props.title) } ref="view">
                    <Image source={{ uri: "http://192.168.31.162:8081/app/img/background.png" } } style={[style.img2, { width: this.state.w, height: this.state.h }]} >
                    </Image>
                    <Image source={{ uri: "http://192.168.31.162:8081/app/img/171604419.jpg" } } style={style.img}  />
                </TouchableOpacity>
            </View>
        );
    }

    _onPress(value) {
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        LayoutAnimation.configureNext({

            duration: 10000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'linear',
                springDamping: 0.4
            }
        });
        this.setState({
            w: this.state.w + 250,
            h: this.state.h
        })
        this._play(value);
    }

    //播放声音
    _play(name) {
        var _this = this;
        RecordAudio.prototype.playRecord(name, (back) => {
            RecordAudio.prototype.recordMsg(back["name"]);
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
        height: 74,
        flexDirection: "row",
        borderRadius: 37,
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    img2: {
        borderWidth: 0,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    }
});