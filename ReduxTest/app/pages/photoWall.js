import React, {Component} from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    Image,
    TouchableOpacity,
    ActionSheetIOS,
    CameraRoll,
    ListView,
    Platform,
    PropTypes
} from 'react-native';
import {Common} from "./common";
import ImageCarousell from 'react-native-image-carousell';
import {getPhotos} from "./camera"

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

export class PhototWall extends Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
        });
        console.log("-------- %s", getPhotos());
        this.state = {
            dataSource: dataSource.cloneWithRows(getPhotos()),
        };
    }

    render() {
        Common.prototype._setPop(this.props.navigator);
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>
                <ImageCarousell
                    dataSource={this.state.dataSource}
                    />
            </View>
        );
    }
}

PhototWall.propTypes = propTypes;

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});