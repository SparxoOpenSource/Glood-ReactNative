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
    Easing,
    TextInput,
    Platform,
}  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';

var widthh = Dimensions.get('window').width
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var heightt = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight
var emailTextInput = null;
var passwordTextInput = null;

export class Authorize extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_margin_top: heightt * (60 / 736),
            password_margin_top: heightt * (45 / 736),
            emailTrans: new Animated.ValueXY({
                x: 0,
                y: 0,
            }),
            passwordTrans: new Animated.ValueXY({
                x: 0,
                y: 0,
            }),
            backViewTrans: new Animated.ValueXY({
                x: 0,
                y: 0,
            })
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png') }>
                <Common/>
                <Animated.View style={[style.feedbackView, { transform: this.state.backViewTrans.getTranslateTransform() }]}>
                    <Image style={{ width: widthh * (100 / 414), height: heightt * (110 / 736), marginLeft: (widthh - (widthh * (100 / 414))) / 2, marginTop: heightt * (41 / 736) }}
                        source={require('../img/logo2.png') }/>
                    <Text style={{
                        backgroundColor: '#00000000', color: "#606060", fontSize: widthh * (23 / 414), fontFamily: 'ProximaNova-Regular',
                        marginTop: heightt * (45 / 736), marginLeft: widthh * (60 / 414), lineHeight: 22,
                    }}>{"The application glood has \nrequested permission to:"}</Text>
                    <Text style={{
                        backgroundColor: '#00000000', color: "#606060", fontSize: widthh * (23 / 414), fontFamily: 'ProximaNova-Regular',
                        marginTop: heightt * (30 / 736), marginLeft: widthh * (60 / 414), lineHeight: 22,
                    }}>{"• Confirm your Sparxo identity \n• Sparxo event list"}</Text>
                    <Animated.Text style={[{
                        backgroundColor: '#00000000',
                        color: '#606060',
                        fontSize: heightt * (23 / 736),
                        fontFamily: 'ProximaNova-Regular',
                        marginLeft: widthh * (60 / 414),
                        marginTop: this.state.email_margin_top
                    }, { transform: this.state.emailTrans.getTranslateTransform() }]}>email</Animated.Text>
                    <View style={{
                        borderBottomWidth: 1, borderBottomColor: '#60606050', height: heightt * (45 / 736), marginLeft: widthh * (60 / 414), width: widthh * (294 / 414),
                        marginTop: heightt * (-25 / 739)
                    }}>
                        <TextInput
                            {...this.props}
                            returnKeyType = "done"
                            style={{ backgroundColor: '#00000000', height: heightt * (45 / 736), fontSize: widthh * (30 / 736) }}
                            onSubmitEditing={() => this._onSubmitEditing('email') }
                            onFocus={() => this._onFocus('email') }
                            onBlur={() => this._onBlur('email') }
                            onChange={(event) => this.updateEmailText(
                                event.nativeEvent.text
                            ) }
                            blurOnSubmit={true}></TextInput>
                    </View>
                    <Animated.Text style={[{
                        backgroundColor: '#00000000',
                        color: '#606060', fontSize: heightt * (23 / 736), fontFamily: 'ProximaNova-Regular', marginTop: this.state.password_margin_top,
                        marginLeft: widthh * (60 / 414)
                    }, { transform: this.state.passwordTrans.getTranslateTransform() }]}>password</Animated.Text>
                    <View style={{
                        borderBottomWidth: 1, borderBottomColor: '#60606050', height: heightt * (45 / 736), marginLeft: widthh * (60 / 414), width: widthh * (294 / 414),
                        marginTop: heightt * (-25 / 739)
                    }}>
                        <TextInput
                            {...this.props}
                            returnKeyType = "done"
                            style={{ backgroundColor: '#00000000', height: heightt * (45 / 736), fontSize: widthh * (30 / 736) }}
                            onSubmitEditing={() => this._onSubmitEditing('password') }
                            onFocus={() => this._onFocus('password') }
                            onBlur={() => this._onBlur('password') }
                            onChange={(event) => this.updatePasswordText(
                                event.nativeEvent.text
                            ) }
                            blurOnSubmit={true}
                            secureTextEntry={true}></TextInput>
                    </View>
                    <Text style={{
                        backgroundColor: '#00000000',
                        color: '#7e7e7e', fontSize: heightt * (16 / 736), fontFamily: 'ProximaNova-Regular', marginTop: heightt * (20 / 736),
                        marginLeft: widthh * (240 / 414)
                    }}>forgot password?</Text>
                    <TouchableOpacity style={{
                        flexDirection: 'row', backgroundColor: '#53aeee', width: widthh, height: heightt * (80 / 736),
                        marginTop: isAndroid() ? heightt * ((736 - 70 - 25 - 60 - 40 - 60 - 400) / 736) : heightt * ((736 - 70 - 40 - 60 - 40 - 60 - 400) / 736)
                    }}
                        onPress={this._authorize.bind(this) }>
                        <Text style={{
                            backgroundColor: '#00000000',
                            color: 'white', fontSize: heightt * (33 / 736), width: widthh * (150 / 414), fontFamily: 'ProximaNova-Bold', marginTop: heightt * ((80 - 50) / 736) / 2,
                            marginLeft: (widthh - (widthh * (130 / 414))) / 2
                        }}>authorize</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Image>
        );
    }
    _authorize() {
        Alert.alert('Authorize success');
    }
    _onFocus(label) {
        if (Platform.OS === 'ios') {
            Animated.timing(this.state.backViewTrans, {
                toValue: {
                    x: 0,
                    y: -heightt * (200 / 736)
                },
                duration: 200,
                delay: 200
            }).start();
        }
        //获得焦点
        switch (label) {
                case "email":
                    Animated.timing(this.state.emailTrans, {
                        toValue: {
                            x: 0,
                            y: -heightt * (25 / 736)
                        },
                        duration: 200,
                        delay: 200
                    }).start();
                    break;
                case "password":
                    Animated.timing(this.state.passwordTrans, {
                        toValue: {
                            x: 0,
                            y: -heightt * (25 / 736)
                        },
                        duration: 200,
                        delay: 200
                    }).start();
                    break;
            }
    }
    _onSubmitEditing(label) {
        //输入结束，按return
        Animated.timing(this.state.backViewTrans, {
            toValue: {
                x: 0,
                y: 0
            },
            duration: 0,
            delay: 0
        }).start();
    }
    updateEmailText(text) {
        this.setState((state) => {
            return {
                curText: text,
                prevText: state.curText,
                prev2Text: state.prevText,
            };
        });
        emailTextInput = text;
    }
    updatePasswordText(text) {
        this.setState((state) => {
            return {
                curText: text,
                prevText: state.curText,
                prev2Text: state.prevText,
            };
        });
        passwordTextInput = text;
    }
    _onBlur(label) {
        //失去焦点
        switch (label) {
            case "email":
                if (emailTextInput == null || emailTextInput == '') {
                    Animated.timing(this.state.emailTrans, {
                        toValue: {
                            x: 0,
                            y: 0
                        },
                        duration: 200,
                        delay: 200
                    }).start();
                }
                break;
            case "password":
                if (passwordTextInput == null || passwordTextInput == '') {
                    Animated.timing(this.state.passwordTrans, {
                        toValue: {
                            x: 0,
                            y: 0
                        },
                        duration: 200,
                        delay: 200
                    }).start();
                }
                break;
        }
    }
}

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: widthh,
        height: heightt,
    },
    feedbackView: {
        width: widthh,
        height: heightt,
        position: 'absolute',
        backgroundColor: 'white',
        marginTop: 10,
    },
});