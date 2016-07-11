
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
    page: PropTypes.func
};

export class DrawerView extends Component {
    render() {
        return (
            <Image source={require('../../img/background3.png') } style={{
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
                            marginLeft: 20,
                            backgroundColor: '#00000000'
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
                            marginLeft: 20,
                            backgroundColor: '#00000000'
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
                            marginLeft: 20,
                            backgroundColor: '#00000000'
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
                            marginLeft: 20,
                            backgroundColor: '#00000000'
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
            </Image>
        )
    }
    closeDrawer() {
        EventListener.trigger("Drawer", "Close");
        // this.props.page.closeDrawer();
    }
    operation(name) {
        // EventListener.trigger("DrawerGo", name);
        switch (name) {
            case "Mingle":
                break;
            case "Tickets":
                this.props.navigator.push({
                    name: "TICKETS", value: "TICKETS", nav: this.props.navigator
                });
                break;
            case "Setting":
                this.props.navigator.push({
                    name: "SETTING", value: "SETTING", nav: this.props.navigator
                });
                break;
            case "FeedBack":
                this.props.navigator.push({
                    name: "FEEDBACK", value: "FEEDBACK", nav: this.props.navigator
                });
                break;
        }
        EventListener.trigger("Drawer", "Close");
    }
}
DrawerView.propTypes = propTypes;