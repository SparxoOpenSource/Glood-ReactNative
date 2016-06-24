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
    TouchableHighlight,
    Switch,
    TextInput,
    DeviceEventEmitter }  from 'react-native';
import {Common} from ".././common";
import isAndroid from '../../utils/isAndroid.js';
import {EventListener} from "../../listener/EventListener";
import DrawerLayout from 'react-native-drawer-layout';


const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class DrawerMe extends Component {
    constructor() {
        super();
        this.state = {
            drawerLockMode: 'unlocked',
        }
    }
    render() {
        const {
            drawerLockMode,
        } = this.state;

        const navigationView = (
            <View style={[styles.container, { backgroundColor: '#fff' }]}>
                <Text>Hello there!</Text>
                <DrawerLockModeSwitches value={drawerLockMode} onValueChange={value => this.setState({ drawerLockMode: value }) } />
                <TouchableHighlight onPress={() => this.drawer.closeDrawer() }>
                    <Text>Close drawer</Text>
                </TouchableHighlight>
            </View>
        );

        return (
            <DrawerLayout
                onDrawerSlide={(e) => this.setState({ drawerSlideOutput: JSON.stringify(e.nativeEvent) }) }
                onDrawerStateChanged={(e) => this.setState({ drawerStateChangedOutput: JSON.stringify(e) }) }
                drawerWidth={300}
                drawerLockMode={drawerLockMode}
                ref={(drawer) => { return this.drawer = drawer } }
                keyboardDismissMode="on-drag"
                renderNavigationView={() => navigationView}>
                <View style={styles.container}>
                    <Text style={styles.welcome}>Content!</Text>
                    <DrawerLockModeSwitches value={drawerLockMode} onValueChange={value => this.setState({ drawerLockMode: value }) } />
                    <Text>{this.state.drawerStateChangedOutput}</Text>
                    <Text>{this.state.drawerSlideOutput}</Text>
                    <TouchableHighlight onPress={() => this.drawer.openDrawer() }>
                        <Text>Open drawer</Text>
                    </TouchableHighlight>
                    <TextInput style={styles.inputField} />
                </View>
            </DrawerLayout>
        );
    }
}
class DrawerLockModeSwitches extends Component {

    render() {
        const {
            value,
            onValueChange,
        } = this.props;

        return (
            <View>
                <View style={[styles.container, styles.split]}>
                    <Switch onValueChange={value => value ? onValueChange('unlocked') : onValueChange('unlocked') } value={value === 'unlocked'} />
                    <Text style={styles.spacedLeft}>Unlocked</Text>
                </View>
                <View style={[styles.container, styles.split]}>
                    <Switch onValueChange={value => value ? onValueChange('locked-closed') : onValueChange('unlocked') } value={value === 'locked-closed'} />
                    <Text style={styles.spacedLeft}>locked-closed</Text>
                </View>
                <View style={[styles.container, styles.split]}>
                    <Switch onValueChange={value => value ? onValueChange('locked-open') : onValueChange('unlocked') } value={value === 'locked-open'} />
                    <Text style={styles.spacedLeft}>locked-open</Text>
                </View>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    inputField: {
        backgroundColor: '#F2F2F2',
        height: 40,
    },
    split: {
        flexDirection: 'row',
    },
    spacedLeft: {
        paddingLeft: 10,
    }
});
DrawerMe.propTypes = propTypes;