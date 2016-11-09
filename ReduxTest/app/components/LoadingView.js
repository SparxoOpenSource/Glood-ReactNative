import React, { Component } from 'react';
import {
    ProgressBarAndroid, 
    ActivityIndicatorIOS, 
    Platform, 
    Text, 
    StyleSheet, 
    View
} from "react-native";
import { fontSizeAndroid } from "../utils/CommonUtils.js";

export class LoadingView extends Component {
    render() {
        if (Platform.OS === 'android') {
            return (
                <View style={ styles.loading }>
                    <ProgressBarAndroid style={{width: 46, height: 46}} styleAttr='LargeInverse' color='#FFFFFF'/>
                    <Text style={ styles.loadingText }>Loading...</Text>
                </View>
            );
        } else {
            return (
                <View style={ styles.loading }>
                    <ActivityIndicatorIOS style={{width: 46, height: 46}} size='large' color="#FFFFFF"/>
                    <Text style={ styles.loadingText }>Loading...</Text>
                </View>
            );
        }
    }
}
const styles = StyleSheet.create({
    loading: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        fontSize:fontSizeAndroid(16),
        marginTop: 10,
        textAlign: 'center',
        color: "#FFFFFF",
        fontFamily: 'ProximaNova-Regular',
        backgroundColor: '#00000000',
    }
});