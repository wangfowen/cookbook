/** @format */

import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {name as appName} from './app.json';
import AppWithNavigation from './app/root/components/AppNavigator';
import CombinedReducer from './app/root/duck/reducer/CombinedReducer';

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const store = createStoreWithMiddleware(CombinedReducer);

class App extends React.Component {
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
