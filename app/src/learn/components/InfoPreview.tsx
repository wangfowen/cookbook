import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import { Info } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'

interface OuterProps {
  info: Info
  navigation: NavigationScreenProp<any,any>
}
class InfoPreview extends React.Component<OuterProps> {
  shorten(text: string) {
    if (text.length < 50) {
      return text
    } else {
      //TODO: render markdown after strip stuff out. custom style on markdown to have all font size same
      return text.slice(0, 47).replace("\n", " ").concat("...")
    }
  }

  navigateToInfo(info: Info) {
    this.props.navigation.push("Info", {infos: [info]})
  }

  //TODO: indicate if this has been read - here, read is if it and all children are read
  render() {
    const {info} = this.props;
    const title = info.title ? <Text style={[styles.p]}>{info.title}</Text> : null
    return (
      <TouchableHighlight onPress={() => this.navigateToInfo(info)}>
        <View style={localStyles.row}>
          <View style={localStyles.text}>
            {title} 
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

export default withNavigation(InfoPreview)

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
