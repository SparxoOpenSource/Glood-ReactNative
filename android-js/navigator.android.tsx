import React = require("react")
import { AppRegistry,
    Component,
    StyleSheet,
    View,
    Text,
    ListView,
    Alert,
    Navigator,
    Image,
    TouchableOpacity }  from 'react-native';
import {ChatProject} from './chat.android';
import {Glood} from './home.android';
var _navigator;
export class NavigatorClass extends Component<{}, {}> {
    renderScene(router, navigator) {
        var component = null;
        _navigator = navigator;
        switch (router.name) {
            case "welcome":
                component = Glood;
                return <Glood navigator={navigator} />
            case "chat":
                return <ChatProject navigator={navigator} />
        }

    }
    render() {
        return (
            <Navigator
                initialRoute={{ name: 'welcome' }}
                renderScene={this.renderScene} />
        );
    }
}
const style = StyleSheet.create({
    txtStyle: {
        flex: 1,
        width: 360,
        height: 50,
    },
    view: {
        width: 360,
        height: 50,
        backgroundColor: "#999999"
    },
    txt: {
        color: "white",
        fontSize: 38,
    },
    button: {
        height: 56,
        backgroundColor: '#cad6c5',
        justifyContent: 'center',
    },
    image: {
        width: 28,
        marginLeft: 3,
        height: 20,
    },
    text: {

        color: "white"
    }
});