import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


import { Info } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'

interface OuterProps {
  info: Info
  onPress: () => void
}
export default class LearnItem extends React.Component<OuterProps> {
  shorten(text: string) {
    if (text.length < 50) {
      return text
    } else {
      //TODO: trim out meta data once add that in
      return text.slice(0, 47).replace("\n", " ").concat("...")
    }
  }

  //TODO: indicate if this has been read 
  render() {
    const {info} = this.props;
    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <View style={localStyles.row}>
          <View style={localStyles.text}>
            <Text style={[styles.p]}>{info.title}</Text>
            <Text style={[styles.p, localStyles.subtext]}>{this.shorten(info.content)}</Text>
          </View>
          <View style={localStyles.iconView}>
            <Icon name="chevron-right" size={15} style={localStyles.moreIcon} />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const localStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 5,
    paddingBottom: 5,
  },
  text: {
    flex: 1,
    flexDirection: 'column'
  },
  subtext: {
    fontSize: 12
  },
  iconView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  moreIcon: {
    color: "#d6d7da",
  }
});
