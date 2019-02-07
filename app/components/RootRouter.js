import React, {Component} from 'react';
import {View, Text, StatusBar} from 'react-native';
import {Router, Route, Scene, Animations, TabBar} from 'react-native-router-flux';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import Home from './Home.js';

import { connect } from 'react-redux'; 
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
const RouterWithRedux = connect()(Router);

const MainNavigator = createStackNavigator({
  Home: {screen: Home}
});

const RootRouter = createAppContainer(MainNavigator);

export default connect(
  (state) => ({
    state: state.AppState
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(RootRouter);