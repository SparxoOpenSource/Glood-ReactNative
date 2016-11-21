import React, { Component } from "react";
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
    Dimensions,
    DeviceEventEmitter
} from 'react-native';
import { Common } from "./common";
import { fontSizeAndroid } from "../utils/CommonUtils.js";
import { joinEventChatRoom } from '../utils/CommonUtils';
import isAndroid from '../utils/isAndroid.js';
var QRCode = require('react-native-qrcode');
var { height, width } = Dimensions.get('window');

const propTypes = {
    date: React.PropTypes.shape({
        barcode: React.PropTypes.string,
        lastName: React.PropTypes.string,
        fristName: React.PropTypes.string,
        ticketName: React.PropTypes.string,
        image: React.PropTypes.string
    }),
    rowID: PropTypes.number
};

export class TicketListItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            IMG: { uri: props.date.image },
            barcode: props.date.barcode,
            lastName: props.date.lastName,
            fristName: props.date.fristName,
            ticketName: props.date.ticketName,
        }
    }
    render() {
        return (
            <View style={{
                width: width,
                height: 240,
                borderBottomColor: '#00000010'
            }}
             >
                <View style={{
                    height:150,
                    flex:0,
                    flexDirection:'row',
                }}>
                    <Image style={{
                        flex:0,
                        flexDirection:'row',
                        height: 150,
                        width: 290,
                        marginLeft: (width-290)/2,
                        borderRadius:5,
                    }} source={this.state.IMG}
                        resizeMode="cover">
                        <View style={{flex:3,marginLeft: 25, marginTop: 15 }}>
                            <QRCode
                            value={this.state.barcode}
                            size={120}
                            bgColor='#737475'
                            fgColor='#FFFFFF' />
                        </View>
                        <View style={{flex:2,flexDirection:'column',alignItems: 'center',padding:15}}>
                            <Text style={{flex:2,marginTop:10,textAlign:'center',fontFamily: "ProximaNova-Semibold",fontSize:18}}>
                            {this.state.lastName} {this.state.fristName}
                            </Text>
                            <Text style={{flex:2,textAlign:'center',fontFamily: "ProximaNova-Regular",fontSize:18}}>
                            {this.state.ticketName}
                            </Text>
                            <Text style={{flex:1,textAlign:'center',fontFamily: "ProximaNova-Semibold",fontSize:22}}>
                            {this.state.barcode}
                            </Text>
                        </View>


                    </Image>
                </View>
                 
            </View>
        );
    }
}
TicketListItem.propTypes = propTypes;