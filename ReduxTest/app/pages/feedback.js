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

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Feedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            backViewTrans: new Animated.ValueXY({
                x: 0,
                y: 0,
            })
        }
    }
    render() {
        return (
            <Animated.Image style={[style.container, { transform: this.state.backViewTrans.getTranslateTransform() }]} source={require('../img/background3.png') }>
                <Common navigator={this.props.navigator}/>
                <View style={style.feedbackView}>
                    <Image style={{ width: 93, height: 113, marginLeft: (widthh - 93) / 2, }} source={require('../img/feedbackeys.png') } />
                    <Text style={{
                        backgroundColor: '#00000000', color: 'black', fontSize: widthh * (23 / 414), fontFamily: 'ProximaNova-Regular',
                        marginTop: heightt * (45 / 736), marginLeft: widthh * (35 / 414), lineHeight: 25,
                    }}>{"If you have some good idea that \nyou think will improve our \ncommunity experience, please \nshare them!"}</Text>
                    <View style={{
                        backgroundColor: 'white', height: heightt * (250 / 736), width: widthh * (345 / 414),
                        marginTop: heightt * (20 / 736), marginLeft: widthh * (35 / 414), borderRadius: 8
                    }}>
                        <TextInput style={{
                            backgroundColor: 'white', height: heightt * (245 / 736), width: widthh * (340 / 414),
                            marginTop: heightt * (2.5 / 736), marginLeft: widthh * (3 / 414), fontSize: 17
                        }}
                            multiline={true}
                            onSubmitEditing={() => this._onSubmitEditing('feedback') }
                            onFocus={() => this._onFocus('feedback') }
                            onBlur={() => this._onBlur('feedback') }
                            onChange={(event) => this.updateText(
                                event.nativeEvent.text
                            ) }
                            blurOnSubmit={true}></TextInput>
                    </View>
                    <TouchableOpacity style={{
                        flexDirection: 'row', backgroundColor: '#53aeee', width: widthh, height: heightt * (70 / 736),
                        marginTop: isAndroid() ? heightt * (85 / 736) : heightt * (37 / 736)
                    }}
                        onPress={this._send.bind(this) }>
                        <Text style={{
                            backgroundColor: '#00000000',
                            color: 'white', fontSize: heightt * (33 / 736), width: widthh * (90 / 414), fontFamily: 'ProximaNova-Bold', marginTop: heightt * ((85 - 50) / 736) / 2,
                            marginLeft: (widthh - (widthh * (80 / 414))) / 2
                        }}>send</Text>
                    </TouchableOpacity>
                </View>
            </Animated.Image>
        );
    }
    updateText(){

    }
    _send() {
        Alert.alert('Send success');
    }
    _onFocus(label) {
        //获得焦点
        if (Platform.OS === 'ios') {
            Animated.timing(this.state.backViewTrans, {
                toValue: {
                    x: 0,
                    y: -heightt * (250 / 736)
                },
                duration: 200,
                delay: 200
            }).start();
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
}
Feedback.propTypes = propTypes;

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
    }
});