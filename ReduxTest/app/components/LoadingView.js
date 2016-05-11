import React from 'react-native';
import {ProgressBarAndroid, ActivityIndicatorIOS, Platform, Text, StyleSheet, View, Component} from React;

export class LoadingView extends Component {
    render() {
        if (Platform.OS === 'android') {
            return (
                <View style={ styles.loading }>
                    <ProgressBarAndroid styleAttr='LargeInverse' color='#3e9ce9'/>
                    <Text style={ styles.loadingText }>加载中...</Text>
                </View>
            );
        } else {
            return (
                <View style={ styles.loading }>
                    <ActivityIndicatorIOS size='large'/>
                    <Text style={ styles.loadingText }>加载中...</Text>
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
        textAlign: 'center'
    }
});