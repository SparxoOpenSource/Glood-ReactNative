/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, { Component } from 'react';
import {Root} from './app/root';
import {Common} from './app/pages/common';
import {DrawerMe} from './app/pages/drawer/drawer';

import {AppRegistry} from 'react-native';

AppRegistry.registerComponent('ReduxTest', () => DrawerMe);
