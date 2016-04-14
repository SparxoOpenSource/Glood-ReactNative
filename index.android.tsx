/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React = require("react")
import { AppRegistry, Component, StyleSheet, View, Text, ListView, Alert}  from 'react-native';

var Button = require("react-native-button");
var data = ['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10', 'row 11'];
var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class ReactNativeGlood extends Component<{}, { dataSource?: any }> {

    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }

    render() {

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this._row.bind(this) }/>
        );
    }

    _row(value) {
        return (
            <View style={styles.container}>
                <Button style={styles.welcomeText} onPress={this._handerClick.bind(this, value) }>
                    {value}
                </Button>
            </View>
        );
    }
    _handerClick(value) {
        Alert.alert(value,"teset");
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcomeText: {
        width: 330,
        height: 50,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 10,
        borderWidth: 5,
        borderRadius: 5,
        borderColor: 'red',
        color:'white',
        backgroundColor: '#999999',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
 AppRegistry.registerComponent('ReactNativeGlood', () => ReactNativeGlood);
