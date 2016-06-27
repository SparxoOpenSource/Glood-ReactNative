/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {Root} from './app/root';
import {Common} from './app/pages/common';
import {DrawerMe} from './app/pages/drawer/drawer';

import {AppRegistry} from 'react-native';
require('ErrorUtils').setGlobalHandler(function (err) {
    console.log('Just ignore android', err);
});
AppRegistry.registerComponent('ReduxTest', () => DrawerMe);
