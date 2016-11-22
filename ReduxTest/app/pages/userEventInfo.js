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
    ScrollView,
    Text
} from 'react-native';

import { Common } from "./common";
import Singleton from '../utils/Singleton';

var {height, width} = Dimensions.get('window');
var singleton = new Singleton();

export class UserEventInfo extends Component {
    constructor() {
        super();
        singleton.setTitle("");
        this.state = {
        }
    }
    render() {
        return (
            <Image style={style.container} source={require('../img/background3.png')}>
                <Common page='Delete' title={singleton.getTitle()} />
                <ScrollView style={{ height: height - 74, width: width }}>
                    <Image style={{ height: (height - 6) / 7 * 1.5, width: width }} source={require('../img/event_background.jpg')} />
                    <View style={{ flex: 0, flexDirection: 'row', height: (height - 74) / 7 * 2.5, width: width }}>
                        <View style={{ flex: 3, flexDirection: 'column'}}>
                            <Text style={{ flex: 2, fontFamily: "ProximaNova-Semibold", fontSize: 25, marginLeft: 30, marginTop: 15 }}>
                                MAY
                            </Text>
                            <Text style={{ flex: 2, fontFamily: "ProximaNova-Semibold", fontSize: 40, marginLeft: 30, marginTop: -20 }}>
                                03
                            </Text>
                            <View style={{ flex: 4}}>
                                <Image style={{ flex: 0, height: 15, width: 15, marginLeft: 60, marginTop: 0 }} source={require('../img/like2.png')} />
                                <Image style={{ flex: 0, height: 15, width: 15, marginLeft: 60, marginTop: 15 }} source={require('../img/like.png')} />
                            </View>
                        </View>
                        <View style={{ flex: 7, flexDirection: 'column'}}>
                            <Text style={{ flex: 4, width:width/10*6,fontFamily: "ProximaNova-Semibold", fontSize: 25, marginTop: 15 }}>
                                Sierra at Tahoe Ski Club
                            </Text>
                            <Text style={{ flex: 2, width:width/10*6, fontFamily: "ProximaNova-Regular", fontSize: 15 ,marginTop:-50}}>
                                9:00 pm - 12:30 am
                            </Text>
                            <Text style={{ flex: 2, width:width/10*6, fontFamily: "ProximaNova-Regular", fontSize: 15 ,marginTop:-30}}>
                                530 Brannan Street, San Francisco
                            </Text>
                        </View>
                    </View>
                    <Text style={{ width: width - 30, marginLeft: 15, fontFamily: "ProximaNova-Regular", fontSize: 15, lineHeight: 20 }}>
                        If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.If I create a new text field for the bold character it will separate it onto another line so that's surely not the way to do it. It would be like creating a tag within a  tag just to make one word bold.
                    </Text>
                </ScrollView>
            </Image>
        );
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