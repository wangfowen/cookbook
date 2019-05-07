import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, ScrollView} from 'react-native';

import { Info } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'

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
      return (
        <ScrollView style={styles.wrapper}>
          <Text style={[styles.p]}>{info.content}</Text>
        </ScrollView>
      );
    } else {
      return null
    }
  }
}
