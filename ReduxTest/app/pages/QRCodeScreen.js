'use strict';

import React, {Component} from "react";

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  VibrationIOS,
  Dimensions
} from "react-native";

import Camera from 'react-native-camera';
import {RecordAudio} from "../utils/RecordAudio";

var {height, width} = Dimensions.get('window');

const propTypes = {
  cancelButtonVisible: React.PropTypes.bool,
  cancelButtonTitle: React.PropTypes.string,
  onSucess: React.PropTypes.func,
  onCancel: React.PropTypes.func,
}

export class QRCodeScreen extends Component {

  getDefaultProps() {
    return {
      cancelButtonVisible: false,
      cancelButtonTitle: 'Cancel',
    };
  }

  _onPressCancel() {
    var $this = this;
    requestAnimationFrame(function () {
      $this.props.navigator.pop();
      if ($this.props.onCancel) {
        $this.props.onCancel();
      }
    });
  }

  _onBarCodeRead(result) {
    var $this = this;
    RecordAudio.prototype.recordMsg(result.data);

    if (this.barCodeFlag) {
      this.barCodeFlag = false;

      setTimeout(function () {
        VibrationIOS.vibrate();
        $this.props.navigator.pop();
        $this.props.onSucess(result.data);
      }, 1000);
    }
  }

  render() {
    var cancelButton = null;
    this.barCodeFlag = true;

    if (this.props.cancelButtonVisible) {
      cancelButton = <CancelButton onPress={this._onPressCancel} title={this.props.cancelButtonTitle} />;
    }

    return (
      <Camera onBarCodeRead={this._onBarCodeRead} style={styles.camera}>
        <View style={styles.rectangleContainer}>

        </View>
      </Camera>
    );
  }
}

class CancelButton extends Component {
  render() {
    return (
      <View style={styles.cancelButton}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Text style={styles.cancelButtonText}>{this.props.title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({

  camera: {
    alignItems: 'center',
    borderRadius: 4,
    width: width - 80,
    height: width - 80,
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 40,
    width: 40,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },

  cancelButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 3,
    padding: 15,
    width: 100,
    bottom: 10,
  },
  cancelButtonText: {
    fontSize: 17,
    fontWeight: '500',
    color: '#0097CE',
  },
});
QRCodeScreen.propTypes = propTypes;