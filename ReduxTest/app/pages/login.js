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
}  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';

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
                y: heightt/2
            })
        }
    }
    render() {
        return (
            <View style={style.container}>
                <Animated.View style={[style.backGroundView, { transform: this.state.bigDogeTrans.getTranslateTransform() }]} >
                    <View style={{ height: heightt, width: widthh, backgroundColor: 'red' }}>
                        <Image source={require('../img/eye.png')} style={{width:widthh*(170/414),height:heightt*(175/736),backgroundColor:'#00000000',
                        marginTop:-(heightt*(175/736)-heightt)/2-heightt*(50/736),marginLeft:(widthh-widthh*(170/414))/2}}/>
                        <Image source={require('../img/line.png')} style={{width:widthh*(1/414),height:heightt*(150/736),backgroundColor:'#00000000',
                        marginLeft:(widthh-widthh*(1/414))/2}}/>
                    </View>

                    <View style={{ height: heightt, width: widthh, backgroundColor: 'green' }}>
                    </View>
                </Animated.View>
            </View>
        );
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
                y: -heightt-(heightt / 2)
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