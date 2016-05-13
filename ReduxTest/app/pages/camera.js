import React, {Component,PropTypes} from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    Image,
    Dimensions,
    TouchableOpacity,
}  from 'react-native';
import {Common} from "./common";

// import Camera from 'react-native-camera';
import Camera from '@remobile/react-native-camera';
import Button from '@remobile/react-native-simple-button';

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};
var photo_pathData = [];

export function getPhotos() {
    return photo_pathData;
}
export class Cameraq extends Component {
    
    jumpPhoto(...imgs){
        Array.prototype.push.apply(photo_pathData,imgs.map((data)=>{ return { uri:"data:image/jpeg;base64,"+data };}));
                this.props.navigator.push({
                    name: "PHOTOWALL", value: "Photo Wall",nav:this.props.navigator
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
    getPhoto(source) {
        var options = {
            quality: 50,
            allowEdit: true,
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: source,
            encodingType: Camera.EncodingType.JPEG,
        };
        Camera.getPicture(options, (imageData) => {
            this.jumpPhoto(imageData);
        }, (error) => {
                console.log(error);
        });
    }
    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>

                <Button style={style.captureButton} onPress={this.capturePhoto.bind(this)}>
                    Capture Photo
                </Button>
                <Button style={style.captureButton} onPress={this.getPhoto.bind(this,Camera.PictureSourceType.PHOTOLIBRARY)}>
                    From Photo Library
                </Button>
            </View>
        );
    }

}

Cameraq.propTypes = propTypes;

var style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    captureButton:{
        paddingTop:50
    }
});
