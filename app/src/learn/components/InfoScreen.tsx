import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, View} from 'react-native';

import { Info } from 'app/models/Info';

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

export default class InfoScreen extends React.Component<OuterProps> {
  getInfo(): Info {
    return this.props.navigation.getParam("info", null)
  }

  render() {
    const info = this.getInfo()

    if (info) {
      console.log(info.content)
      return (
        <View>
          <Text>Info</Text>
          <Text style={[styles.text]}>{info.content}</Text>
        </View>
      );
    } else {
      return null
    }
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingTop: 10,
    height: 40,
    paddingLeft: 5
  },
  text: {
    fontSize: 16,
    color: '#111',
    paddingRight: 10
  },
});
