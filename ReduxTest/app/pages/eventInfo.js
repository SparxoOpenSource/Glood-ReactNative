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
    Dimensions,
    Animated,
    Easing,
}  from 'react-native';
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
import {EventListener} from "../listener/EventListener";
import {Pop} from "../utils/AlertPop";
var {height, width} = Dimensions.get('window');
var STATUS_BAR_HEIGHT = Navigator.NavigationBar.Styles.General.StatusBarHeight;
import {Initialization,LoginNow} from "../utils/SupportLogin";
var maxSize = isAndroid() ? 30 : 35;
var deviceWidth = Dimensions.get('window').width;
var widthh = Dimensions.get('window').width;
var heightt = Dimensions.get('window').height;
var cha = width - 90;
var leftEvery = 90 / 2 - 90 / 2 + cha / 2;
var currentTime = 0;
var currentTime1 = 0;
var _animateHandler;
var _animateHandler2;
var viewOpacity_1 = new Animated.Value(0.3);
var viewOpacity_2 = new Animated.Value(0.3);
var runBool_1 = false;
var runBool_2 = false;
var maxsize_image_top = isAndroid() ? (maxSize / 2+60) : (maxSize / 2+30);
var bottom_text_name_height = isAndroid() ? 120 :80;

const propTypes = {
     title: PropTypes.string,
     navigator: PropTypes.object
};

export class EventInfo extends Component {

constructor(props) {
        super(props);
        currentTime = 0;
        currentTime1 = 0;
        viewOpacity_1 = new Animated.Value(0.3);
        viewOpacity_2 = new Animated.Value(0.3);
        runBool_1 = false;
        runBool_2 = false;
        this.state = {
            w: 90,
            h: 90,
            left: cha / 2,
            imageTop: maxsize_image_top,
            imageLeft: leftEvery,
            viewWidth_1: 90,
            viewHeight_1: 90,
            viewTop_1: maxsize_image_top,
            viewLeft_1: leftEvery,
            viewRadius_1: 45,
            viewWidth_2: 90,
            viewHeight_2: 90,
            viewTop_2: maxsize_image_top,
            viewLeft_2: leftEvery,
            viewRadius_2: 45,
            viewOpacity_1: viewOpacity_1,
            viewOpacity_2: viewOpacity_2,
            bounceValue_1: new Animated.Value(1),
            bounceValue_2: new Animated.Value(1),
            bounceValue_3: new Animated.Value(1),
            isCisClick: false,
            playCode: props.title,
            auto: props.auto,
            imgIsBig: false,
            bottom_view_image_width:1,
            bottom_view_image_height:30,
            background_imagex: require('../img/background.png'),
            firstTop: props.rowID === 0 ? ((props.dateLength * (90 + maxSize)) > heightt ? 0 : (heightt - 90 - maxSize)) : 0
        }
        setTimeout(() => {
                this._onPress();
            }, 1000);
    }
    componentDidMount() {
        if (isAndroid()) {
            //安卓平台使用 LayoutAnimation 动画必须加上这么一句代码（否则动画会失效）
            UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        }
        
    }
    firstTopMargin(number) {
        if (this.props.rowID === 0) {
            var temp = number * (90 + maxSize);
            if (heightt > temp) {
                this.setState({
                    firstTop: heightt - temp
                });
            }
        }
    }

    render() {
        return (
            <Image source={require('../img/background3.png') } style={styles.background} >
                <Common navigator={this.props.navigator} title={"Crazy May Fest 2017"}/>
                <Image style={{width:widthh,height:heightt*(200/736)}} source={require('../img/event_background.jpg')}/>
                <Text style={{backgroundColor:'#00000000',color: 'black', fontSize: heightt * (25 / 736), width: widthh * (250 / 414), 
                fontFamily: 'ProximaNova-Semibold',marginLeft:(widthh-(widthh * (250 / 414)))/2,marginTop:heightt*(20/736)}}>Can't wait to see you at Crazy May 2016!</Text>
                <View style={ { justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                    height: 90 + maxSize,
                    width: width,
                    marginTop: this.state.firstTop
                }}>
                    <Animated.View style={{
                        width: this.state.viewWidth_1,
                        height: this.state.viewHeight_1,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_1,
                        backgroundColor: "green",
                        opacity: this.state.viewOpacity_1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: this.state.viewLeft_1,
                        marginTop: this.state.viewTop_1,
                        position: "absolute",
                        transform: [{ scale: this.state.bounceValue_1 }]
                    }}/>
                    <Animated.View style={{
                        width: this.state.viewWidth_2,
                        height: this.state.viewHeight_2,
                        borderWidth: 0,
                        borderRadius: this.state.viewRadius_2,
                        backgroundColor: "green",
                        opacity: this.state.viewOpacity_2,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: "absolute",
                        marginLeft: this.state.viewLeft_2,
                        marginTop: this.state.viewTop_2,
                        transform: [{ scale: this.state.bounceValue_2 }]
                    }}/>
                    <TouchableOpacity style={{
                        width: 90, height: 90,
                        borderWidth: 0,
                        borderRadius: 45,
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: "absolute",
                        marginLeft: this.state.imageLeft,
                        marginTop: this.state.imageTop,
                        transform: [{ scale: this.state.bounceValue_3 }]
                    }} onPress={this._onPress.bind(this)} ref="view">
                        <Animated.Image source={require('../img/171604419.jpg') } style={{
                            width: 90,
                            height: 90,
                            borderWidth: 0,
                            borderRadius: 45
                        }}  />
                    </TouchableOpacity>
                </View>
              </View>
                <Text style={{backgroundColor:'#00000000',color: 'black', fontSize: heightt * (25 / 736), width: widthh * (95 / 414), 
                fontFamily: 'ProximaNova-Light',marginLeft:(widthh-(widthh * (95 / 414)))/2,marginTop:heightt*(bottom_text_name_height/736)}}>Christina</Text>
                <Text style={{backgroundColor:'#00000000',color: 'black', fontSize: heightt * (25 / 736), width: widthh * (230 / 414), 
                fontFamily: 'ProximaNova-Light',marginLeft:(widthh-(widthh * (230 / 414)))/2,marginTop:heightt*(5/736)}}>Founder of Crazy Fest</Text>
               <View style={{width:widthh,height:25,marginTop:height*(45/736),backgroundColor:'#00000030'}}>
                  <Image source={require('../img/event_background_bottom.png')} style={{width:this.state.bottom_view_image_width,height:25}}/>
               </View>
            </Image>
        );
    }
    _onPress() {
       this._playAnimOne(5);
       this._playAnim(5);
    }
    _playAnim(time) {
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
                        bottom_view_image_width: this.state.bottom_view_image_width + widthh,
                        bottom_view_image_height:30
                    })
        
    }
    /**
     * 第一个声波动画
     */
    _playAnimOne(times) {
        currentTime = currentTime + 0.5;
        if (currentTime >= times) {
            this._jumpEventChat("NEWMIC", this.props.navigator);
            currentTime = 0;
            return;
        }
        _animateHandler = Animated.parallel([
            Animated.timing(this.state.bounceValue_1, {
                toValue: 2.0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            }),
            Animated.timing(this.state.viewOpacity_1, {
                toValue: 0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            })
        ]);
        this.state.viewOpacity_1.addListener((callback) => {
            if (callback.value > 0.1) {
                runBool_1 = false;
            } else if (callback.value <= 0.1) {
                if (runBool_1 === false) {
                    this._playAnimTwo(times);
                    runBool_1 = true;
                }
            }
            if (callback.value === 0) {
                this.setState({
                    viewWidth_1: 90,
                    viewHeight_1: 90,
                    viewTop_1: maxsize_image_top,
                    viewLeft_1: leftEvery,
                    viewRadius_1: this.state.viewHeight_1,
                    viewOpacity_1: new Animated.Value(0.3),
                    bounceValue_1: new Animated.Value(1),
                })
            }
        });
        _animateHandler.start && _animateHandler.start();
    }
    /**
     * 第二个声波动画
     */
    _playAnimTwo(times) {
        currentTime = currentTime + 0.5;
        if (currentTime >= times) {
            this._jumpEventChat("NEWMIC", this.props.navigator);
            currentTime = 0;
            return;
        }
        _animateHandler2 = Animated.parallel([
            Animated.timing(this.state.bounceValue_2, {
                toValue: 2.0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            }),
            Animated.timing(this.state.viewOpacity_2, {
                toValue: 0,  //透明度动画最终值
                duration: 800,   //动画时长3000毫秒
                easing: Easing.linear  //缓动函数
            })
        ]);

        this.state.viewOpacity_2.addListener(callback => {
            if (callback.value > 0.1) {
                runBool_2 = false;
            } else if (callback.value <= 0.1) {
                if (runBool_2 === false) {
                    this._playAnimOne(times);
                    runBool_2 = true;
                }
            }
            if (callback.value === 0) {
                this.setState({
                    viewWidth_2: 90,
                    viewHeight_2: 90,
                    viewTop_2: maxsize_image_top,
                    viewLeft_2: leftEvery,
                    viewRadius_2: this.state.viewHeight_1,
                    viewOpacity_2: new Animated.Value(0.3),
                    bounceValue_2: new Animated.Value(1),
                })
            }
        });
        _animateHandler2.start && _animateHandler2.start();
    }

  _jumpEventChat(value, navigator) {
    Pop("Log in, please...");
       this.setState(
           {
                        bottom_view_image_width: 1,
                        bottom_view_image_height:30
                    });
        Initialization();
        LoginNow(value, navigator);
    }
}

EventInfo.propTypes = propTypes;

var styles = StyleSheet.create({
touch: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 6,
        width: 320,
        flexDirection: "row",
        borderRadius: 45,
        backgroundColor: "#99999900",
        justifyContent: 'center',
        alignItems: 'center'
    },
    touch2: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: "#99999950",
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 90,
        height: 90,
        borderWidth: 0,
        borderRadius: 45,
        position: "absolute",
        alignItems: 'center'
    },
    img3: {
        borderWidth: 0,
        borderRadius: 45,
        position: "absolute",
        alignItems: 'center',
        backgroundColor: "green"
    },
    img2: {
        borderWidth: 0,
        borderRadius: 45,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#000000',
        fontSize: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        fontFamily: 'ProximaNova-Semibold',
    },
    background: {
        width: width,
        height: height
    },
})