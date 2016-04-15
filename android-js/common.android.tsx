/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React = require("react")
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert, ScrollView, TouchableOpacity, Image}  from 'react-native';
var _navigator;

export class CommonView extends Component<{}, { dataSource?: any }> {

    render() {
        return (
            <View>
                <View style = {styles.view}>
                    <TouchableOpacity onPress={this._onBack.bind(this) }>
                        <Image  source={require('../img/list4.png') } style={{ width: 20, height: 20 }}  />
                    </TouchableOpacity>
                    <Text style={{ fontSize: 18, color: '#484848' }}>SHOP</Text>
                    <Image  source={require('../img/search.png') } style={{ width: 20, height: 20 }} />
                </View>
            </View>
        );
    }
    _onBack() {
        _navigator.pop();
    }
    _setPop(pop) {
        _navigator = pop;
    }
}
const styles = StyleSheet.create({
    view: {
        backgroundColor: '#999999',
        height: 54,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    }
});
