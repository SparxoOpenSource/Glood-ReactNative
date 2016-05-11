import React, {Component} from "react";
import { 
    AppRegistry, 
    StyleSheet, 
    View, 
    Text, 
    Navigator, 
    Image, 
    Dimensions,
    TouchableOpacity 
}  from 'react-native';
import {Common} from "./common";
import Camera from 'react-native-camera';

export class Cameraq extends Component {
    render() {
        Common.prototype._setPop(this.props.navigator);
        return (
            <View style={style.container}>
                <Common/>

                    <Camera
                        ref={(cam) => {
                            this.camera = cam;
                        }}
                        style={style.preview}
                        aspect={Camera.constants.Aspect.fill}>
                        <Text style={style.capture} onPress={this.takePicture.bind(this)}>CAPTURE</Text>
                     </Camera>
            </View>
        );
    }
    
    takePicture() {
    this.camera.capture()
      .then((data) => console.log("data:----------   %s",data))
      .catch(err => console.error("error:----------   %s",err));
      this.props.navigator.push({
                    name: "PHOTOWALL", value: "Photo Wall"
                });
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
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#F5FCFF',
    },
    preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
});
