import React,{Component} from "react";
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
} from 'react-native';
import {Common} from "./common";
import ImageCarousell from 'react-native-image-carousell';
import {getPhotos} from "./camera" 

export class PhototWall extends Component {
    constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      dataSource: dataSource.cloneWithRows(getPhotos()),
      
    };
  }
    
    render() {
        Common.prototype._setPop(this.props.navigator);
        return (
            <View style={style.container}>
                <Common/>
                <ImageCarousell
                    dataSource={this.state.dataSource}
                    />
            </View>
        );
    }
     _setTitle(value) {
        if (value == null) {
            _title = "我是导航";
            Common.prototype._setTitle(value);
        } else {
            _title = value;
        }
        Common.prototype._setTitle(_title);
    }
}
const style = StyleSheet.create({
    container: {
        flex: 1,
    },
});