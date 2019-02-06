import React, {Component} from 'react';
import {View, Navigator, Text, StatusBar} from 'react-native';
import {Router, Route, Scene, Animations, TabBar} from 'react-native-router-flux';
import Home from './Home';

import { connect } from 'react-redux'; 
import {bindActionCreators} from 'redux';
import * as actions from '../actions/actions';
const RouterWithRedux = connect()(Router);

class RootRouter extends Component {
  constructor(props) {
    super(props);
  }

  renderScene(route, navigator) {
    const {state, actions} = this.props;
    const routeId = route.id;
    if (routeId === 'Home') {
      return (
          <Home
          {...this.props}
          navigator={navigator} />
      );
    }
  }
  
  render() {
    return (
      <View style={{flex:1}}>
        <Navigator
            style={{flex: 1}}
            initialRoute={{id: 'Home', name: 'Home'}}
            renderScene={this.renderScene.bind(this)}
        />
      </View>
    );
  }
}

export default connect(
  (state) => ({
    state: state.AppState
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  })
)(RootRouter);