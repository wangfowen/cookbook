import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

import { Info } from 'app/models/Info';

interface OuterProps {
  info: Info
  onPress: () => void
}
export default class LearnItem extends React.Component<OuterProps> {

  render() {
    const {info} = this.props;

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Text style={[styles.text]}>{info.title}</Text>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    height: 40,
  },
  text: {
    fontSize: 16,
    height: 32,
    color: '#111',
    paddingRight: 10
  },
});
