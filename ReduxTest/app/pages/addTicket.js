import React, { Component } from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    ListView,
    Navigator,
    Image,
    TouchableOpacity,
    TouchableWithoutFeedback,
    PropTypes,
    Dimensions,
    Text
} from 'react-native';

import { Common } from "./common";
import Singleton from '../utils/Singleton';

var {height, width} = Dimensions.get('window');
var singleton = new Singleton();

export class AddTicket extends Component {
    constructor() {
        super();
        singleton.setTitle("");
        this.state = {
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png')}>
                <Common page='noPage' title={singleton.getTitle()} />
                <View style={{ height: height - 74, width: width }}>
                    <Image style={{ width: 93, height: 113, marginLeft: (width - 93) / 2 }} source={require('../img/feedbackeys.png')} />
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (30 / 414), fontFamily: 'ProximaNova-Semibold',
                            marginTop: height * (35 / 736)
                        }}>{"Oops!"}
                        </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (22 / 414), fontFamily: 'ProximaNova-Regular',
                            marginTop: height * (20 / 736)
                        }}>{"Look like we can't find any"}
                        </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (22 / 414), fontFamily: 'ProximaNova-Regular',
                            marginTop: height * (10 / 736)
                        }}>{"ticket under your email"}
                        </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (22 / 414), fontFamily: 'ProximaNova-Regular',
                            marginTop: height * (10 / 736)
                        }}>{"Please add tickets and join"}
                        </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (22 / 414), fontFamily: 'ProximaNova-Semibold',
                            marginTop: height * (10 / 736)
                        }}>{"12345@gmail.com"}
                        </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (22 / 414), fontFamily: 'ProximaNova-Regular',
                            marginTop: height * (10 / 736)
                        }}>{"communities by scanning the QR"}
                        </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (22 / 414), fontFamily: 'ProximaNova-Regular',
                            marginTop: height * (10 / 736)
                        }}>{"code on the ticket you received"}
                        </Text>
                    </View>
                    <View style={{ flex: 0, alignItems: 'center' }}>
                        <Text style={{
                            backgroundColor: '#00000000', color: 'black', fontSize: width * (22 / 414), fontFamily: 'ProximaNova-Regular',
                            marginTop: height * (10 / 736)
                        }}>{"in your email."}
                        </Text>
                    </View>
                    <TouchableOpacity style={{ flex: 0, backgroundColor: '#46A5EA', height: height * (60 / 736), marginTop: height * (131 / 736) }} 
                    onPress={this.addTicket.bind(this)}>
                    
                        <Text style={{color: 'white', fontSize: width * (50 / 414), fontFamily: 'ProximaNova-Bold',marginLeft:width/5*1.3,
                            marginTop:height * (5 / 736)
                        }}>+</Text>
                        <Text style={{color: 'white', fontSize: width * (30 / 414), fontFamily: 'ProximaNova-Bold',marginLeft:width/5*1.3+30,
                            marginTop:-height * (40 / 736)
                        }}>
                         add a ticket
                        </Text>
                    </TouchableOpacity>
                </View>
            </Image>
        );
    }

    addTicket() {
        singleton.setTitle("QrcodeReader");
        singleton.getNav().push({
            name: "QrcodeReader",
        });
    }

    componentWillmount() {
        console.log('xxxxxxxx---------');
    }
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: width,
        height: height,
    }
});