/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
"use strict";
const React = require("react");
const react_native_1 = require('react-native');
var Button = require("react-native-button");
var data = ['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10', 'row 11'];
var ds = new react_native_1.ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
class ReactNativeGlood extends react_native_1.Component {
    constructor() {
        super();
        this.state = {
            dataSource: ds.cloneWithRows(data)
        };
    }
    render() {
        return (React.createElement(react_native_1.ListView, {dataSource: this.state.dataSource, renderRow: this._row.bind(this)}));
    }
    _row(value) {
        return (React.createElement(react_native_1.View, {style: styles.container}, React.createElement(Button, {style: styles.welcomeText, onPress: this._handerClick.bind(this, value)}, value)));
    }
    _handerClick(value) {
        react_native_1.Alert.alert(value, "teset");
    }
}
const styles = react_native_1.StyleSheet.create({
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
        color: 'white',
        backgroundColor: '#999999',
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
react_native_1.AppRegistry.registerComponent('ReactNativeGlood', () => ReactNativeGlood);
