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
    DeviceEventEmitter,
    ToastAndroid,
    AlertIOS, }  from 'react-native';
import isAndroid from '../utils/isAndroid.js';
var {height, width} = Dimensions.get('window');

const propTypes = {
    navigator: PropTypes.object
};
/**
 * 介绍
 */
export class IntroduceWelcome extends Component {
    render() {
        return (
            <Image style={styles.container} source={require('../img/glood_4.jpg') }>
                <View>
                    <Image style={styles.slide}/>
                </View>
            </Image>
        );
    }
}

IntroduceWelcome.propTypes = propTypes;

var styles = StyleSheet.create({
    container: {
        height: height,
        width: width
    },
    slide: {
        flex: 1,
        backgroundColor: 'transparent',
        fontSize: width * (68 / 414),
        color: "#103C4D",
        marginTop: 20,
    },
    image: {
        flex: 1,
        width: width,
        height: height
    }
})