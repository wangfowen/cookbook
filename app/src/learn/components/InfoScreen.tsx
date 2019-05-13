import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, ScrollView} from 'react-native';

import { Info } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

export default class InfoScreen extends React.Component<OuterProps> {
  getInfos(): Info[] {
    return this.props.navigation.getParam("infos", null)

    //TODO: if any have children, append after that info after this one
  }

  //TODO: how download media content to device? and then how reference them dynamically? saving as string is not great
  //TODO: parse info - images, line breaks, videos
  //TODO: when scroll to the text, mark it as read
  //TODO: if any of the original ones have parent, put a link to that one below it
  render() {
    const infos = this.getInfos()
    if (infos) {
      const content = infos.map((info) => <Text style={[styles.p]}>{info.content}</Text>)
      return (
        <ScrollView style={styles.wrapper}>
          {content}
        </ScrollView>
      );
    } else {
      return null
    }
  }
}
