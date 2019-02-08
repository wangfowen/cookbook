/** @format */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {name as appName} from './app.json';
import AppWithNavigation from './app/components/AppNavigator';
import CombinedReducer from './app/reducers/CombinedReducer';

const store = createStore(CombinedReducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AppWithNavigation />
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => App);

export default App;
