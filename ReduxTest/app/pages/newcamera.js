////////
//https://github.com/marcshilling/react-native-image-picker
///////


import React, {Component, PropTypes} from "react";
import {
    AppRegistry,
    StyleSheet,
    View,
    Text,
    Navigator,
    Image,
    Dimensions,
    TouchableOpacity,
    Alert,
    NativeModules,
    Platform,
    ScrollView,
}  from 'react-native';
import {Common} from "./common";

var photo_pathData = [];

export function getNewPhotos() {
    return photo_pathData;
}

// import Camera from 'react-native-camera';
import Camera from '@remobile/react-native-camera';
import Button from '@remobile/react-native-simple-button';
var ImagePickerManager = NativeModules.ImagePickerManager;
var {height, width} = Dimensions.get('window');

const propTypes = {
    title: PropTypes.string,
    navigator: PropTypes.object
};

var options = {
    title: 'Select Avatar', // specify null or empty string to remove the title
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo...', // specify null or empty string to remove this button
    chooseFromLibraryButtonTitle: 'Choose from Library...', // specify null or empty string to remove this button
    customButtons: {
        'Choose Photo from Facebook': 'fb', // [Button Text] : [String returned upon selection]
    },
    cameraType: 'back', // 'front' or 'back'
    mediaType: 'photo', // 'photo' or 'video'
    videoQuality: 'high', // 'low', 'medium', or 'high'
    durationLimit: 10, // video recording max time in seconds
    maxWidth: width, // photos only
    maxHeight: height, // photos only
    aspectX: 2, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    aspectY: 1, // android only - aspectX:aspectY, the cropping image's ratio of width to height
    quality: 1, // 0 to 1, photos only
    angle: 0, // android only, photos only
    allowsEditing: false, // Built in functionality to resize/reposition the image after selection
    noData: false, // photos only - disables the base64 `data` field from being generated (greatly improves performance on large photos)
    storageOptions: { // if this key is provided, the image will get saved in the documents directory on ios, and the pictures directory on android (rather than a temporary directory)
        skipBackup: true, // ios only - image will NOT be backed up to icloud
        path: 'images' // ios only - will save image at /Documents/images rather than the root
    }
};

export class NewCamera extends Component {
    constructor() {
        super();
        this.state = {
            avatarSource: "source"
        }
    }

    newCamera() {
        // Launch Camera:
        ImagePickerManager.launchCamera(options, (response) => {
            Alert.alert(response.uri);
        });
    }
    newLibrily() {
        // Open Image Library:
        ImagePickerManager.launchImageLibrary(options, (response) => {
            // Same code as in above section!
        });
    }
    render() {
        return (
            <View style={style.container}>
                <Common navigator={this.props.navigator} title={this.props.title}/>

                <Button style={style.captureButton} onPress={this.newShown.bind(this) }>
                    Camera
                </Button>
            </View>
        );
    }
    newShown() {
        ImagePickerManager.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePickerManager Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // You can display the image using either data:
                const source = { uri: 'data:image/jpeg;base64,' + response.data, isStatic: true };
                if (Platform.OS === 'ios') {
                    // uri (on iOS)
                    source = { uri: response.uri.replace('file://', ''), isStatic: true };
                } else {
                    // uri (on android)
                    source = { uri: response.uri, isStatic: true };
                }

                photo_pathData.push(source);
                this.props.navigator.push({
                    name: "PHOTOWALL", value: "New Photo Wall", nav: this.props.navigator
                });

            }
        });
    }
}

NewCamera.propTypes = propTypes;

var style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    captureButton: {
        paddingTop: 50
    },
});
