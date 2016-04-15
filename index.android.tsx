/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import { AppRegistry}  from 'react-native';

import {Glood} from './android-js/home.android'
import {NavigatorClass} from './android-js/navigator.android'


AppRegistry.registerComponent('ReactNativeGlood', () => NavigatorClass);
