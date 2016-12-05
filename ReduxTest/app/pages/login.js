import React, { Component } from "react";
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
    Alert,
    Platform,
} from 'react-native';
import { Common } from "./common";
import isAndroid from '../utils/isAndroid.js';
import Singleton from '../utils/Singleton';
import { start } from '../utils/CommonUtils';
var singleton = new Singleton();
var widthh = Dimensions.get('window').width;
var heightt = Dimensions.get('window').height;

export class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signIn_text_color: '#A7A8AA',
            signUp_text_color: '#38A7EF',
            bottom_sign_title: 'sign up',
            sign_in_view_opacity: 1,
            sign_up_view_opacity: 0,
            sign_in_view_width: widthh * (300 / 414),
            sign_up_view_width: 1,
            bigDogeTrans: new Animated.ValueXY({
                x: 0,
                y: heightt / 2,
            })
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png')}>
                <Animated.View style={[style.backGroundView, { transform: this.state.bigDogeTrans.getTranslateTransform() }]} >
                    <View style={{ height: heightt, width: widthh, backgroundColor: '#00000000' }}>
                        <Image source={require('../img/eye.png')} style={{
                            width: widthh * (170 / 414), height: heightt * (200 / 736), backgroundColor: '#00000000',
                            marginTop: -(heightt * (190 / 736) - heightt) / 2 - heightt * (170 / 736), marginLeft: (widthh - widthh * (170 / 414)) / 2
                        }} />
                        <Image source={require('../img/line.png')} style={{
                            width: widthh * (2 / 414), height: heightt * (175 / 736), backgroundColor: '#00000010',
                            marginLeft: (widthh - widthh * (2 / 414)) / 2 - widthh * (13 / 414), marginTop: heightt * (-20 / 736)
                        }} />
                        <Image source={require('../img/glood_text2.png')} style={{
                            width: widthh * (131 / 414), height: heightt * (81 / 736), backgroundColor: '#00000000',
                            marginLeft: (widthh - widthh * (131 / 414)) / 2, marginTop: heightt * (-40 / 736)
                        }} />
                        <View style={{
                            width: widthh * (414 / 414), height: heightt * (86 / 736), backgroundColor: '#FFFFFF30',
                            marginTop: heightt * (106 / 736) + 20, borderTopWidth: 1, borderTopColor: 'white'
                        }}>
                            <TouchableOpacity style={{ width: widthh / 2, height: heightt * (86 / 736) }} onPress={this._signIn.bind(this)}>
                                <Text style={{
                                    backgroundColor: '#00000000',
                                    color: this.state.signIn_text_color, fontSize: heightt * (30 / 736), width: widthh / 2, fontFamily: 'ProximaNova-Regular', marginTop: heightt * ((86 - 20) / 736) / 2,
                                    marginLeft: widthh / 8
                                }}>sign in</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: widthh / 2, height: heightt * (96 / 736), marginTop: -heightt * (86 / 736), marginLeft: widthh / 2 }} onPress={this._signUp.bind(this)}>
                                <Text style={{
                                    backgroundColor: '#00000000',
                                    color: this.state.signUp_text_color, fontSize: heightt * (30 / 736), width: widthh / 2, fontFamily: 'ProximaNova-Regular', marginTop: heightt * ((86 - 20) / 736) / 2,
                                    marginLeft: widthh / 8
                                }}>sign up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ height: heightt, width: widthh, backgroundColor: '#00000000' }}>
                        <View style={{
                            opacity: this.state.sign_in_view_opacity,
                            width: this.state.sign_in_view_width, height: heightt * (300 / 736), marginLeft: (widthh - (widthh * (300 / 414))) / 2,
                            marginTop: (heightt - (heightt * (300 / 736))) / 2 - heightt * (50 / 736) - 20
                        }}>
                            <Text style={{
                                backgroundColor: '#00000000', color: '#7e7e7e', fontSize: heightt * (22 / 736), fontFamily: 'ProximaNova-Regular',
                                marginLeft: widthh * (5 / 414)
                            }}>name</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#60606050', height: heightt * (45 / 736) }}>
                                <TextInput
                                    {...this.props}
                                    returnKeyType="done"
                                    style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}
                                    onFocus={() => this._onFocus('signupCreatName')}
                                    onBlur={() => this._onBlur('signupCreatName')}
                                    ></TextInput>
                            </View>
                            <Text style={{
                                backgroundColor: '#00000000', color: '#7e7e7e', fontSize: heightt * (22 / 736), fontFamily: 'ProximaNova-Regular',
                                marginTop: heightt * (30 / 736), marginLeft: widthh * (5 / 414)
                            }}>email</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#60606050', height: heightt * (45 / 736) }}>
                                <TextInput
                                    {...this.props}
                                    returnKeyType="done"
                                    style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}
                                    onFocus={() => this._onFocus('signupCreatEmail')}
                                    onBlur={() => this._onBlur('signupCreatEmail')}
                                    ></TextInput>
                            </View>
                            <Text style={{
                                backgroundColor: '#00000000', color: '#7e7e7e', fontSize: heightt * (22 / 736), fontFamily: 'ProximaNova-Regular',
                                marginTop: heightt * (30 / 736), marginLeft: widthh * (5 / 414)
                            }}>create password</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#60606050', height: heightt * (45 / 736) }}>
                                <TextInput
                                    {...this.props}
                                    returnKeyType="done"
                                    style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}
                                    onFocus={() => this._onFocus('signupCreatPassword')}
                                    onBlur={() => this._onBlur('signupCreatPassword')}
                                    secureTextEntry={true}></TextInput>
                            </View>
                        </View>
                        <View style={{
                            opacity: this.state.sign_up_view_opacity,
                            width: this.state.sign_up_view_width, height: heightt * (350 / 736), marginLeft: (widthh - (widthh * (300 / 414))) / 2,
                            marginTop: (heightt - 4 * (heightt * (300 / 736))) / 2 - heightt * (50 / 736) - 10
                        }}>
                            <Text style={{
                                backgroundColor: '#00000000', color: '#7e7e7e', fontSize: heightt * (22 / 736), fontFamily: 'ProximaNova-Regular',
                                marginLeft: widthh * (5 / 414)
                            }}>email</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#60606050', height: heightt * (45 / 736) }}>
                                <TextInput
                                    returnKeyType="done"
                                    style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}></TextInput>
                            </View>
                            <Text style={{
                                backgroundColor: '#00000000',
                                color: '#7e7e7e', fontSize: heightt * (22 / 736), fontFamily: 'ProximaNova-Regular', marginTop: heightt * (30 / 736),
                                marginLeft: widthh * (5 / 414)
                            }}>password</Text>
                            <View style={{ borderBottomWidth: 1, borderBottomColor: '#60606050', height: heightt * (45 / 736) }}>
                                <TextInput style={{ backgroundColor: '#00000000', height: heightt * (45 / 736) }}
                                    returnKeyType="done"
                                    secureTextEntry={true}></TextInput>
                            </View>
                            <Text style={{
                                backgroundColor: '#00000000',
                                color: '#7e7e7e', fontSize: heightt * (18 / 736), fontFamily: 'ProximaNova-Regular', marginTop: heightt * (25 / 736),
                                marginLeft: widthh * (160 / 414)
                            }}>forgot password?</Text>
                            <TouchableOpacity style={{ width: widthh * (300 / 414), height: heightt * (60 / 736), marginTop: heightt * (65 / 736), marginLeft: widthh * (5 / 414) }}>
                                <Image style={{ width: widthh * (300 / 414), height: heightt * (60 / 736) }} source={require('../img/facebook_sign_in.png')} />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={{ flexDirection: 'row', backgroundColor: '#53aeee', width: widthh, height: heightt * (70 / 736), marginTop: isAndroid() ? heightt * (73 / 736) : heightt * (83 / 736) }}
                            onPress={this._handerClick.bind(this)}>
                            <Text style={{
                                backgroundColor: '#00000000',
                                color: 'white', fontSize: heightt * (32 / 736), width: widthh * (110 / 414), fontFamily: 'ProximaNova-Bold', marginTop: heightt * ((60 - 30) / 736) / 2,
                                marginLeft: (widthh - (widthh * (110 / 414))) / 2
                            }}>{this.state.bottom_sign_title}</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </Image>
        );
    }
    //获得焦点
    _onFocus(label) {
        if (Platform.OS === 'ios') {
            Animated.timing(this.state.bigDogeTrans, {
                toValue: {
                    x: 0,
                    y: -heightt * (1100 / 736)
                },
                duration: 200,
                delay: 200
            }).start();
        }  
    }
    
    //失去焦点
    _onBlur(label) {
        if (Platform.OS === 'ios') {
            Animated.timing(this.state.bigDogeTrans, {
                toValue: {
                    x: 0,
                    y: -heightt - (heightt / 2) + (heightt * (96 / 736))
                },
                duration: 200,
                delay: 200
            }).start();
        }
    }
    _signIn() {
        this.setState({
            signIn_text_color: '#38A7EF',
            signUp_text_color: '#A7A8AA',
            bottom_sign_title: 'sign in',
            sign_in_view_opacity: 0,
            sign_up_view_opacity: 1,
            sign_in_view_width: 1,
            sign_up_view_width: widthh * (300 / 414),
        });
    }
    _signUp() {
        this.setState({
            signIn_text_color: '#A7A8AA',
            signUp_text_color: '#38A7EF',
            bottom_sign_title: 'sign up',
            sign_in_view_opacity: 1,
            sign_up_view_opacity: 0,
            sign_up_view_width: 1,
            sign_in_view_width: widthh * (300 / 414),
        });
    }
    _handerClick() {

        setTimeout(() => {
            //连接聊天服务器，用户进行登录操作，系统分配用户名，ID和记录登录时间
            start();
        }, 0);

        // singleton.setTitle("Crazy May Fest 2017");
        // singleton.getNav().replace({
        //     name: "DrawerMe"
        // });
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

var style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000000',
        width: widthh,
        height: heightt
    },
    backGroundView: {
        position: 'absolute',
        width: widthh,
        height: heightt * 3,
    },
});