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
import {fontSizeAndroid} from "../utils/CommonUtils.js";
import {EventListener} from "../listener/EventListener";

var {height, width} = Dimensions.get('window');

const propTypes = {
    date: React.PropTypes.shape({
        user: React.PropTypes.number,
        total: React.PropTypes.number,
        eventName: React.PropTypes.string,
        id: React.PropTypes.number,
        image: React.PropTypes.string
    }),
    rowID: PropTypes.number,
    navigator: PropTypes.object
};
/**
 * 活动列表
 */
export class ActivityListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IMG: { uri: props.date.image }
        }
    }
    render() {
        return (
            <TouchableOpacity style={{
                flexDirection: 'row',
                flex: 7,
                width: width,
                height: 60,
                borderBottomWidth: 1,
                borderBottomColor: '#00000010'
            }}
                onPress={this._handerClick.bind(this, this.props.date.eventName, this.props.navigator) }>
                <View style={{
                    flex: 6,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Image style={{
                        height: 59,
                        width: 120,
                        marginBottom:1,
                    }} source={this.state.IMG}/>
                    <Text style={{
                        fontSize: fontSizeAndroid(18),
                        color: "#070909",
                        marginLeft: 18,
                        backgroundColor: '#00000000',
                        fontFamily: "ProximaNova-Regular",
                        width: width - 120 - (width / 7)
                    }}
                        numberOfLines={1}>{this.props.date.eventName}</Text>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <View style={{
                        backgroundColor: "#ed145b",
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                    }}></View>
                </View>
            </TouchableOpacity>
        );
    }
    _handerClick(value, navigator) {
        EventListener.trigger("DrawerOpenPage", "EventInfo", this.props.navigator);
    }
}
ActivityListItem.propTypes = propTypes;