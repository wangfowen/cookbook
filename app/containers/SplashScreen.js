import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux'; 

import {initApp} from '../actions/AppActions';

class SplashScreen extends Component {
  componentDidMount() {
    this.props.initApp();

    const {navigation} = this.props;
    if (this.props.firstLoad) {
      navigation.replace("Home");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.splash}>Cook Book Splash Screen</Text>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    firstLoad: state.app.firstLoad
  };
}

export default connect(mapStateToProps, {initApp})(SplashScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  splash: {
    fontSize: 50,
    textAlign: 'center',
    margin: 10,
  }
});
