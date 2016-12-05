// 'use strict'; 有可能报出不知位置的错误  
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableHighlight,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';

import TimerMixin from 'react-timer-mixin';
import isAndroid from './isAndroid.js';
const {width, height} = Dimensions.get('window');
const navigatorH = 64; // navigator height  
const [aWidth, aHeight] = [270, 210];
const [left, top] = [0, 0];
const [middleLeft, middleTop] = [(width - aWidth) / 2, (height - aHeight) / 2 - navigatorH];
const middleLeft2 = width / 2 - middleLeft - 30;//头像的left
var maxSize = isAndroid() ? 30 : 35;
var cha = width - 60;
/** 
* Dialog组件 
* <Dialog ref="dialog" callback={this.callback.bind(this)}/> 
* 调用show方法，调起组件   this.refs.dialog.show("确定删除吗"); 
*/

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: width,
    height: height,
    left: left,
    top: top,
    borderRadius: 30,
  },
  mask: {
    justifyContent: "center",
    backgroundColor: "#ffffff",
    opacity: 0.8,
    position: "absolute",
    width: width,
    height: height,
    left: left,
    top: top,
  },
  tipOutter: {
    width: aWidth,
    height: aHeight,
    left: middleLeft,
    opacity: 0.8,
    alignItems: "center",
    flexDirection: "column",

  },
  tipPhoto: {
    position: "absolute",
    left: middleLeft2,
    top: 0,
    width: 60,
    height: 60,
    borderWidth: 0,
    borderRadius: 30,
    alignItems: "center",//水平居中
  },
  tipInner: {
    top: 20,
    width: aWidth,
    height: aHeight - 30,
    backgroundColor: "white",
    alignItems: "center",
    flexDirection: "column",
    borderWidth: 0,
    borderRadius: 10,
  },
  tipTitleView: {
    width: aWidth,
    borderBottomWidth: 1 / 2,
    top: 20,
    height: aHeight - 20 - 30 - 40,
    borderColor: '#f0f0f0',
  },
  tipTitleText: {
    color: "#333333",
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
    height: aHeight - 20 - 30 - 40,
  },

  btnView: {
    top: 20,
    flexDirection: 'row',
    height: 40,
    borderWidth: 0,
    borderRadius: 10,
  },
  cancelBtnView: {
    width: aWidth / 2,
    height: 40,
    backgroundColor: '#0099FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#ffffff',
  },
  cancelBtnText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: 'bold',
  },
  okBtnView: {
    width: aWidth / 2,
    height: 40,
    backgroundColor: '#0099FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  okBtnText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});
export class Dialog extends Component {
  mixins = [TimerMixin];
  parent = {};

  constructor(props) {
    super(props);
    this.state = {
      w: 60,
      h: 60,
      left: cha / 2,
      imageTop: maxSize / 2,
      offset: new Animated.Value(0),
      opacity: new Animated.Value(0),
      title: "",
      hide: true,
    };
  }

  render() {
    if (this.state.hide) {
      return (<View />)
    } else {
      return (
        <View style={styles.container} >
          <Animated.View style={styles.mask} >
          </Animated.View>

          <Animated.View style={[styles.tipOutter, {
            transform: [{
              translateY: this.state.offset.interpolate({
                inputRange: [0, 1, 2],
                outputRange: [0, middleTop, height]
              }),
            }]
          }]}>

            <View style={styles.tipInner}>
              <View style={styles.tipTitleView}>
                <Text style={styles.tipTitleText}>{this.state.title}</Text>
              </View>
              <View style={styles.btnView}>
                <TouchableHighlight style={styles.cancelBtnView} underlayColor='#f0f0f0' onPress={this.cancelBtn.bind(this)}>
                  <Text style={styles.cancelBtnText}>No</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.okBtnView} underlayColor='#f0f0f0' onPress={this.okBtn.bind(this)}>
                  <Text style={styles.okBtnText}>Yes</Text>
                </TouchableHighlight>
              </View>
            </View>

            <Image source={require('../img/like2.png')} style={styles.tipPhoto} />
          </Animated.View>
        </View>
      );
    }
  }


  //显示动画  
  in() {
    Animated.parallel([
      Animated.timing(
        this.state.opacity,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 0.8,
        }
      ),
      Animated.timing(
        this.state.offset,
        {
          easing: Easing.linear,
          duration: 200,
          toValue: 1,
        }
      )
    ]).start();
  }

  //隐藏动画  
  out() {
    return new Promise((done) => {
      Animated.parallel([
        Animated.timing(
          this.state.opacity,
          {
            easing: Easing.linear,
            duration: 200,
            toValue: 0,
          }
        ),
        Animated.timing(
          this.state.offset,
          {
            easing: Easing.linear,
            duration: 200,
            toValue: 2,
          }
        )
      ]).start();
      setTimeout(
        () => {
          this.setState({ hide: true });
          //还原到顶部  
          Animated.timing(
            this.state.offset,
            {
              easing: Easing.linear,
              duration: 200,
              toValue: 0,
            }
          ).start();
          done();
        },
        200
      );
    })
  }

  //取消  
  cancelBtn(event) {
    if (!this.state.hide) {
      this.out().then(() => {
        if (this.cCallback) {
          this.cCallback();
        }
      });

    }
  }
  //选择  
  okBtn() {
    if (!this.state.hide) {
      this.out();
      setTimeout(
        () => {
          if (this.sCallback) {
            this.sCallback();
          }
        },
        200
      );
    }
  }

  sCallback = null;
  cCallback = null;
  /** 
  * 弹出控件 
  * titile: 标题 
  */
  show(title) {
    if (this.state.hide) {
      this.setState({ title: title, hide: false }, this.in);
    }
    return new Promise((then, fail) => {
      this.sCallback = then;
      this.cCallback = fail;
    });
  }
}
