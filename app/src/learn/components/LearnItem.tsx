import React from 'react';
import {StyleSheet, Text, TouchableHighlight} from 'react-native';

import { Info } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'

interface OuterProps {
  info: Info
  onPress: () => void
}
export default class LearnItem extends React.Component<OuterProps> {

  render() {
    const {info} = this.props;

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <Text style={[styles.p]}>{info.title}</Text>
      </TouchableHighlight>
    );
  }
}
