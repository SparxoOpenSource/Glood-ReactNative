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
// import Camera from 'react-native-camera';
import Camera from '@remobile/react-native-camera';
import Button from '@remobile/react-native-simple-button';

var photo_pathData = [];

export function getPhotos() {
    return photo_pathData;
}

export class Cameraq extends Component {
    
    jumpPhoto(...imgs){
        Array.prototype.push.apply(photo_pathData,imgs.map((data)=>{ return { uri:"data:image/jpeg;base64,"+data };}));
                this.props.navigator.push({
                    name: "PHOTOWALL", value: "Photo Wall"
                });
    }
    
    capturePhoto() {
        
        var options = {
            quality: 50,
            allowEdit: false,
            destinationType: Camera.DestinationType.DATA_URL,
        };
        Camera.getPicture(options, (imageData) => {
            this.jumpPhoto(imageData);
        });
    }
    capturePhotoEdit() {
        var options = {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.DATA_URL,
        };
        Camera.getPicture(options, (imageData) => {
            this.jumpPhoto(imageData);
        });
    }
    getPhoto(source) {
        var options = {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: source,
            encodingType: Camera.EncodingType.PNG,
        };
        Camera.getPicture(options, (imageData) => {
            this.jumpPhoto(imageData);
        }, (error) => {
                console.log(error);
        });
    }
    render() {
        Common.prototype._setPop(this.props.navigator);
        return (
            <View style={style.container}>
                <Common/>

                <Button onPress={this.capturePhoto.bind(this)}>
                    Capture Photo
                </Button>
                // <Button onPress={this.capturePhotoEdit.bind(this)}>
                //     Capture Editable Photo
                // </Button>
                <Button onPress={this.getPhoto.bind(this,Camera.PictureSourceType.PHOTOLIBRARY)}>
                    From Photo Library
                </Button>
                // <Button onPress={this.getPhoto.bind(this, Camera.PictureSourceType.SAVEDPHOTOALBUM)}>
                //     From Photo Album Editable
                // </Button>
            </View>
        );
    }

    // takePicture() {
    //     this.camera.capture()
    //         .then((data) => {
    //             console.log("data:----------   %s", data)
    //               photo_pathData.push(require('../img/voice.png'));
    //             // photo_pathData.push(require(data.path));
    //             this.props.navigator.push({
    //                 name: "PHOTOWALL", value: "Photo Wall"
    //             });
    //         })
    //         .catch(err => console.error("error:----------   %s", err));
    // }

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
