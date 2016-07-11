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
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png') }>
                <Common navigator={this.props.navigator}/>
                <View style={style.feedbackView}>
                    <Image style={{ width: 93, height: 113, marginLeft: (widthh - 93) / 2, }} source={require('../img/feedbackeys.png') } />
                    <Text style={{
                        backgroundColor: '#00000000', color: 'black', fontSize: widthh * (22 / 414), fontFamily: 'OpenSans',
                        marginTop: heightt * (45 / 736), marginLeft: widthh * (35 / 414)
                    }}>{"If you have some good idea that \nyou think will improve our \ncommunity experience, please \nshare them!"}</Text>
                    <View style={{
                        backgroundColor: 'white', height: heightt * (250 / 736), width: widthh * (345 / 414),
                        marginTop: heightt * (20 / 736), marginLeft: widthh * (35 / 414), borderRadius: 8
                    }}>
                        <TextInput style={{
                            backgroundColor: 'white', height: heightt * (245 / 736), width: widthh * (340 / 414),
                            marginTop: heightt * (2.5 / 736), marginLeft: widthh * (3 / 414), fontSize: 17
                        }} multiline={true}/>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#53aeee', width: widthh, height: heightt * (70 / 736), marginTop: heightt * (47 / 736) }}
                        onPress={this._send.bind(this) }>
                        <Text style={{
                            backgroundColor: '#00000000',
                            color: 'white', fontSize: heightt * (32 / 736), width: widthh * (90 / 414), fontFamily: 'OpenSans-Bold', marginTop: heightt * ((70-50) / 736) / 2,
                            marginLeft: (widthh - (widthh * (80 / 414))) / 2
                        }}>send</Text>
                    </TouchableOpacity>
                </View>
            </Image>
        );
    }
    _send() {
        Alert.alert('Send success');
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