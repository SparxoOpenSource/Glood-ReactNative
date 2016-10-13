
import React, { Component } from "react";
import {
    AppRegistry,
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
    DeviceEventEmitter
} from 'react-native';
import isAndroid from '../../utils/isAndroid.js';
import { EventListener } from "../../listener/EventListener";
import { fontSizeAndroid } from "../../utils/CommonUtils.js";

var {height, width} = Dimensions.get('window');

export class DrawerView extends Component {
    render() {
        return (
            <Image source={require('../../img/background3.png')} style={{
                flex: 6,
                width: width - 80,
                height: height,
                flexDirection: 'row',
            }}>
                <View style={{
                    flex: 5,
                    flexDirection: 'column',
                }}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30,
                        alignItems: 'center',
                    }}
                        onPress={this.operation.bind(this, "Mingle")}>
                        <Image source={require("../../img/mingle.png")} style={{
                            width: 26,
                            height: 31
                        }} />
                        <Text style={{
                            fontSize: fontSizeAndroid(18),
                            color: "#333333",
                            marginLeft: 20,
                            backgroundColor: '#00000000',
                            fontFamily: "ProximaNova-Regular",
                        }}>Mingle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30,
                        alignItems: 'center',
                    }}
                        onPress={this.operation.bind(this, "Tickets")}>
                        <Image source={require("../../img/tickets.png")} style={{
                            width: 26,
                            height: 26
                        }} />
                        <Text style={{
                            fontSize: fontSizeAndroid(18),
                            color: "#333333",
                            marginLeft: 20,
                            backgroundColor: '#00000000',
                            fontFamily: "ProximaNova-Regular",
                        }}>Tickets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30,
                        alignItems: 'center',
                    }}
                        onPress={this.operation.bind(this, "Setting")}>
                        <Image source={require("../../img/setting.png")} style={{
                            width: 26,
                            height: 26
                        }} />
                        <Text style={{
                            fontSize: fontSizeAndroid(18),
                            color: "#333333",
                            marginLeft: 20,
                            backgroundColor: '#00000000',
                            justifyContent: 'center',
                            fontFamily: "ProximaNova-Regular",
                        }}>Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30,
                        alignItems: 'center',
                    }}
                        onPress={this.operation.bind(this, "FeedBack")}>
                        <Image source={require("../../img/feedback.png")} style={{
                            width: 26,
                            height: 24
                        }} />
                        <Text style={{
                            fontSize: fontSizeAndroid(18),
                            color: "#333333",
                            marginLeft: 20,
                            backgroundColor: '#00000000',
                            fontFamily: "ProximaNova-Regular",
                        }}>FeedBack</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: 'column',
                }}
                    onPress={this.closeDrawer.bind(this)}>
                    <Image style={{
                        width: 7,
                        height: 30,
                        position: 'absolute',
                        marginLeft: 16,
                        marginTop: 10
                    }} source={require("../../img/yuan.png")} />
                </TouchableOpacity>
            </Image>
        )
    }
    closeDrawer() {
        EventListener.trigger("Drawer", "Close");
    }
    operation(name) {
        EventListener.trigger("DrawerOpenPage", name);
    }
}