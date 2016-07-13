'use strict';
import {Dimensions }  from 'react-native';
var {height, width} = Dimensions.get('window');
import isAndroid from './isAndroid.js';

export function NaviGoBack(navigator) {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
}

export function isEmptyObject(obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}
export function fontSizeAndroid(params) {
    return width * (params / 360)
}