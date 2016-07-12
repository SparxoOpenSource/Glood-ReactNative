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
    Easing
}  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
var Switch = require('react-native-material-switch');
var widthh = Dimensions.get('window').width
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
var heightt = Dimensions.get('window').height - Navigator.NavigationBar.Styles.General.NavBarHeight - 20

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
export class Setting extends Component {
    constructor() {
        super();
        this.state = {
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png') }>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <View style={{ width: widthh, height: heightt, backgroundColor: '#00000000', marginTop: heightt * (35 / 736) }}>
                    <Text style={{
                        color: 'black', fontSize: heightt * (27 / 736), width: widthh * (300 / 414), fontFamily: 'OpenSans',
                        marginLeft: widthh * (30 / 414)
                    }}>Conversation Notification</Text>
                    <View style={{marginTop:heightt*(-32/736),marginLeft:widthh*(330/414)}}>
                        <Switch style={{backgroundColor:"#00000000"}}
                        buttonRadius={14} switchHeight={17} switchWidth={45} 
                        activeBackgroundColor='rgba(12, 212, 196, 0.50)'
                        inactiveBackgroundColor='rgba(172, 172, 172, 0.70)'
                        activeButtonColor='rgba(12, 212, 196, 1)'
                        inactiveButtonPressedColor='rgba(254, 255, 255, 1)'
                        onChangeState={(state) => alert('change state '+ state)}/>
                    </View>
                    <Text style={{
                        color: 'black', fontSize: heightt * (27 / 736), width: widthh * (300 / 414), fontFamily: 'OpenSans',
                        marginLeft: widthh * (30 / 414), marginTop: heightt * (60 / 736)
                    }}>Event Organizer</Text>
                    <View style={{marginTop:heightt*(-32/736),marginLeft:widthh*(330/414)}}>
                        <Switch style={{backgroundColor:"#00000000"}}
                        buttonRadius={14} switchHeight={17} switchWidth={45} 
                        activeBackgroundColor='rgba(12, 212, 196, 0.50)'
                        inactiveBackgroundColor='rgba(172, 172, 172, 0.70)'
                        activeButtonColor='rgba(12, 212, 196, 1)'
                        inactiveButtonPressedColor='rgba(254, 255, 255, 1)'
                        onChangeState={(state) => alert('change state '+ state)}/>
                    </View>
                    <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#53aeee', width: widthh, height: heightt * (70 / 736), 
                    marginTop: heightt * ((736-70-27-27-60-20-17) / 736) }}
                        onPress={this._logout.bind(this) }>
                        <Text style={{
                            backgroundColor: '#00000000',
                            color: 'white', fontSize: heightt * (32 / 736), width: widthh * (110 / 414), fontFamily: 'OpenSans-Bold', marginTop: heightt * ((70 - 50) / 736) / 2,
                            marginLeft: (widthh - (widthh * (80 / 414))) / 2
                        }}>logout</Text>
                    </TouchableOpacity>
                </View>
            </Image>
        );
    }
    _logout() {

    }
}
Setting.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 7,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: widthh,
        height: heightt,
    }
});