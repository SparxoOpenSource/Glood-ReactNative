
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
    DeviceEventEmitter }  from 'react-native';
import isAndroid from '../../utils/isAndroid.js';
import {EventListener} from "../../listener/EventListener";
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object,
    page: PropTypes.string
};

export class DrawerView extends Component {
    render() {
        return (
            <View style={{
                flex: 6,
                width: width - 80,
                height: height,
                flexDirection: 'row',
            }}>
                <Image source={require('../../img/background3.png') } style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: width - 80,
                    height: height
                }} />
                <View style={{
                    flex: 5,
                    flexDirection: 'column',
                }}>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30
                    }}
                        onPress={this.operation.bind(this, "Mingle") }>
                        <Image source={require("../../img/mingle.png") } style={{
                            width: 26,
                            height: 30
                        }}/>
                        <Text style={{
                            fontSize: 18,
                            color: "#333333",
                            marginLeft: 20
                        }}>Mingle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30
                    }}
                        onPress={this.operation.bind(this, "Tickets") }>
                        <Image source={require("../../img/tickets.png") } style={{
                            width: 26,
                            height: 26
                        }}/>
                        <Text style={{
                            fontSize: 18,
                            color: "#333333",
                            marginLeft: 20
                        }}>Tickets</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30
                    }}
                        onPress={this.operation.bind(this, "Setting") }>
                        <Image source={require("../../img/setting.png") } style={{
                            width: 26,
                            height: 26
                        }}/>
                        <Text style={{
                            fontSize: 18,
                            color: "#333333",
                            marginLeft: 20
                        }}>Setting</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        flexDirection: 'row',
                        marginTop: 30,
                        marginLeft: 30
                    }}
                        onPress={this.operation.bind(this, "FeedBack") }>
                        <Image source={require("../../img/feedback.png") } style={{
                            width: 26,
                            height: 24
                        }}/>
                        <Text style={{
                            fontSize: 18,
                            color: "#333333",
                            marginLeft: 20
                        }}>FeedBack</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{
                    flex: 1,
                    flexDirection: 'column',
                }}
                    onPress={this.closeDrawer.bind(this) }>
                    <Image style={{
                        width: 6,
                        height: 31,
                        position: 'absolute',
                        marginLeft: 16,
                        marginTop: 10
                    }} source={require("../../img/yuan.png") }/>
                </TouchableOpacity>
            </View>)
    }
    closeDrawer() {
        EventListener.trigger("CloseDrawer");
    }
    operation(name) {
        EventListener.trigger("DrawerGo", name);
    }
}
DrawerView.propTypes = propTypes;