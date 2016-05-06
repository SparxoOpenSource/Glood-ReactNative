
var React = require('react-native');
var {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Easing,
    Animated,
    TouchableOpacity,
    LayoutAnimation,
    } = React;

var _animateHandler;
var ConnectView = React.createClass({
     getInitialState() {
        return { w: 100, h: 50 }
    },

    _onPress() {
        LayoutAnimation.configureNext({
            duration: 10000,   //持续时间
            create: {
                type: 'linear',
                property: 'opacity'
            },
            update: {
                type: 'spring',
                springDamping: 1
            }
        });
        this.setState({w: this.state.w + 250, h: this.state.h,justifyContent: 'center'})
    },

    render: function() {
        return (
            <View style={styles.container}>
            <TouchableOpacity onPress={this._onPress}>
                <View style={[styles.content, {width: this.state.w, height: this.state.h,borderRadius:50}]}>
                </View>
               </TouchableOpacity>
                
            </View>
        );
    }
});
// <Text style={[{textAlign: 'center'}]}>Press me!</Text>
var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        justifyContent: 'center',
        backgroundColor: 'yellow',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default ConnectView;