/** @format */

import React, { Component } from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {name as appName} from './app.json';
import AppWithNavigation from './app/components/AppNavigator';
import CombinedReducer from './app/reducers/CombinedReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(CombinedReducer);

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
