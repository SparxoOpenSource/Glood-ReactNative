import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    ListView,
    Navigator,
    Image,
    TouchableOpacity,
    LayoutAnimation,
    PropTypes,
    Animated,
    Dimensions,
    Easing,
    TextInput,
}  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import Button from '@remobile/react-native-simple-button';

var widthh = Dimensions.get('window').width
var heightt = Dimensions.get('window').height

var view_margin_top;

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bigDogeTrans: new Animated.ValueXY({
                x: 0,
                y: heightt / 2
            })
        }
    }
    render() {
        return (
            <View style={style.container}>
                <Animated.View style={[style.backGroundView, { transform: this.state.bigDogeTrans.getTranslateTransform() }]} >
                    <View style={{ height: heightt, width: widthh, backgroundColor: '#00000000' }}>
                        <Image source={require('../img/eye.png') } style={{
                            width: widthh * (170 / 414), height: heightt * (200 / 736), backgroundColor: '#00000000',
                            marginTop: -(heightt * (190 / 736) - heightt) / 2 - heightt * (170 / 736), marginLeft: (widthh - widthh * (170 / 414)) / 2
                        }}/>
                        <Image source={require('../img/line.png') } style={{
                            width: widthh * (2 / 414), height: heightt * (175 / 736), backgroundColor: '#00000000',
                            marginLeft: (widthh - widthh * (2 / 414)) / 2 - widthh * (13 / 414), marginTop: heightt * (-20 / 736)
                        }}/>
                        <Image source={require('../img/glood_text2.png') } style={{
                            width: widthh * (131 / 414), height: heightt * (81 / 736), backgroundColor: '#00000000',
                            marginLeft: (widthh - widthh * (131 / 414)) / 2, marginTop: heightt * (-40 / 736)
                        }}/>
                        <Image source={require('../img/signinup1.png') } style={{
                            width: widthh * (414 / 414), height: heightt * (96 / 736), backgroundColor: '#00000000',
                            marginTop: heightt * (96 / 736) + 20
                        }}/>

                    </View>
                    <View style={{ height: heightt, width: widthh, backgroundColor: '#00000000' }}>

                        <View style={{
                            width: widthh * (340 / 414), height: heightt * (300 / 736), marginLeft: (widthh - (widthh * (340 / 414))) / 2,
                            marginTop: (heightt - (heightt * (300 / 736))) / 2 - heightt * (50 / 736) - 20
                        }}>
                            <Text style={{ color: '#7e7e7e', fontSize: heightt * (18 / 736), fontFamily: 'MyriadPro-Semibold', marginLeft: widthh * (5 / 414) }}>name</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#7e7e7e', height: heightt * (45 / 736) }}>
                                <TextInput style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}></TextInput>
                            </View>
                            <Text style={{ color: '#7e7e7e', fontSize: heightt * (18 / 736), fontFamily: 'MyriadPro-Semibold', marginTop: heightt * (30 / 736), marginLeft: widthh * (5 / 414) }}>email</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#7e7e7e', height: heightt * (45 / 736) }}>
                                <TextInput style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}></TextInput>
                            </View>
                            <Text style={{ color: '#7e7e7e', fontSize: heightt * (18 / 736), fontFamily: 'MyriadPro-Semibold', marginTop: heightt * (30 / 736), marginLeft: widthh * (5 / 414) }}>create password</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#7e7e7e', height: heightt * (45 / 736) }}>
                                <TextInput style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}></TextInput>
                            </View>
                        </View>
                        <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#53aeee', width: widthh, height: heightt * (60 / 736), marginTop: heightt * (137 / 736) }}
                            onPress={this._handerClick.bind(this, this.props.navigator) }>
                            <Text style={{
                                color: 'white', fontSize: heightt * (25 / 736), width: widthh * (90 / 414), fontFamily: 'MyriadPro-Semibold', marginTop: heightt * ((60 - 30) / 736) / 2,
                                marginLeft: (widthh - (widthh * (90 / 414))) / 2
                            }}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </View>
        );
    }
    _handerClick(navigator) {
        this.props.navigator.push({
            name: "DrawerMe", value: "DrawerMe", nav: navigator
        });
    }
    componentDidMount() {
        Animated.timing(this.state.bigDogeTrans, {
            toValue: {
                x: 0,
                y: -heightt / 2
            },
            duration: 2000,
            delay: 500
        }).start();
        setTimeout(() => {
            Animated.timing(this.state.bigDogeTrans, {
                toValue: {
                    x: 0,
                    y: -heightt - (heightt / 2) + (heightt * (96 / 736))
                },
                duration: 2000,
                delay: 500
            }).start();
        }, 2300);

    }
}
Login.propTypes = propTypes;
var style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000000',
    },
    backGroundView: {
        position: 'absolute',
        width: widthh,
        height: heightt * 3,
    },
});