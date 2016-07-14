import React, {Component} from 'react';
import {ProgressBarAndroid, ActivityIndicatorIOS, Platform, Text, StyleSheet, View} from "react-native";

export class LoadingView extends Component {
    render() {
        if (Platform.OS === 'android') {
            return (
                <View style={ styles.loading }>
                    <ProgressBarAndroid styleAttr='LargeInverse' color='#FFFFFF'/>
                    <Text style={ styles.loadingText }>Loading...</Text>
                </View>
            );
        } else {
            return (
                <View style={ styles.loading }>
                    <ActivityIndicatorIOS size='large' color="#FFFFFF"/>
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
        marginTop: 10,
        textAlign: 'center',
        color: "#FFFFFF",
        backgroundColor: '#00000000',
    }
});