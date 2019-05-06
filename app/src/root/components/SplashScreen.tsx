import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { connect } from 'react-redux'; 
import { NavigationScreenProp } from 'react-navigation';

import {initApp} from '../duck/actions';
import { ReduxState } from 'app/CombinedReducer';

interface StateProps {
  setPreferences: boolean
}

interface DispatchProps {
  initApp: () => void
}

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

class SplashScreen extends React.Component<StateProps & DispatchProps & OuterProps> {
  componentDidMount() {
    this.props.initApp();
  }

  componentWillReceiveProps(newProps) {
    if (this.props.setPreferences === undefined && newProps.setPreferences !== undefined) {
      this.redirect(newProps.setPreferences);
    }
  }

  redirect(setPreferences) {
    const {navigation} = this.props;
    if (setPreferences) {
      //TODO: add preferences page
      //navigation.replace("Preferences");
      navigation.replace("Home");
    } else {
      navigation.replace("Home");
    }
  }

  render() {
    const {setPreferences} = this.props;

    if (setPreferences === undefined) {
      return (
        <View style={styles.container}>
          <Text style={styles.splash}>Cook Book Splash Screen</Text>
        </View>
      )
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    setPreferences: state.app.setPreferences
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
