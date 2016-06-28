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
import {Common} from "./common";
import isAndroid from '../utils/isAndroid.js';
var {height, width} = Dimensions.get('window');

const propTypes = {
    date: React.PropTypes.shape({
        user: React.PropTypes.number,
        total: React.PropTypes.number,
        eventName: React.PropTypes.string,
        id: React.PropTypes.number
    }),
    rowID: PropTypes.number,
    navigator: PropTypes.object
};
/**
 * 活动列表
 */
export class ActivityListItem extends Component {
    render() {
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                flex: 7,
                width: width,
                height: 60,
                borderBottomWidth: 1,
                borderBottomColor: '#12BFBB'
            }}
                onPress={this._handerClick.bind(this, this.props.date.eventName, this.props.navigator) }>
                <View style={{
                    flex: 6,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={{
                        fontSize: width*(18/414),
                        color: "#070909",
                        fontWeight: "bold",
                        marginLeft: 16
                    }}>{this.props.date.use}/{this.props.date.total}</Text>
                    <Text style={{
                        fontSize: width*(18/414),
                        color: "#070909",
                        marginLeft: 8
                    }}>{this.props.date.eventName}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        backgroundColor: "red",
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                    }}></View>
                </View>
            </TouchableOpacity>
        );
    }
    _handerClick(value, navigator) {
        this.props.navigator.push({
            name: "EVENTINFO", value: value, nav: navigator
        });
    }
}
ActivityListItem.propTypes = propTypes;