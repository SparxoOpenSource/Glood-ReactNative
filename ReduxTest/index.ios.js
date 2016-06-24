/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */


import {Root} from './app/root';
import {AppRegistry} from 'react-native';
import React, { Component } from 'react';
require('ErrorUtils').setGlobalHandler(function (err) {
  console.log('Just ignore',err);
});

AppRegistry.registerComponent('ReduxTest', () => Root);
