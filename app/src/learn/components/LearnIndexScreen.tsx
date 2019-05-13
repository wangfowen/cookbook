import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import { connect } from 'react-redux'

import { ReduxState } from 'app/CombinedReducer';
import LearnItem from './LearnItem';
import { Info, InfoId, LearnInfoIds } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'

interface StateProps {
  infos: Map<InfoId, Info>
  learnInfoIds: LearnInfoIds
}

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

class LearnIndexScreen extends React.Component<StateProps & OuterProps> {
  navigateToInfo(info: Info) {
    this.props.navigation.navigate("Info", {infos: [info]})
  }

  getInfo(category: string) {
    return this.props.learnInfoIds[category]
      .map((id) => this.props.infos.get(id))
  }

  render() {
    return (
      <View style={[localStyles.info, styles.wrapper]}>
        <Text style={styles.h1}>Learn!</Text>
        <SectionList
          renderItem={({item}) => <LearnItem info={item} onPress={() => this.navigateToInfo(item)}/>}
          renderSectionHeader={({section: {title}}) => (
            <Text style={[styles.h3, localStyles.section]}>{title}</Text>
          )}
          sections={[
            {title: 'General', data: this.getInfo("general")},
            {title: 'Ingredients', data: this.getInfo("ingredients")},
            {title: 'Tools', data: this.getInfo("tools")},
          ]}
          keyExtractor={(item, index) => item + index}
        />
      </View>
    );
  }
}

const mapStateToProps = (state: ReduxState) => {
  return {
    infos: state.info.infos,
    learnInfoIds: state.info.learnInfoIds
  };
}

export default connect(mapStateToProps)(LearnIndexScreen);

const localStyles = StyleSheet.create({
  info: {
    flex: 1,
  },
  section: {
    marginTop: 15
  }
});
