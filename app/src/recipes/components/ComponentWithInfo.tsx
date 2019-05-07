import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { ReduxState } from 'app/CombinedReducer';
import { InfoId, Info } from 'app/models/Info';
import styles from './RecipeStyles';
import { markRead } from 'app/learn/duck/actions';

interface OuterProps {
  text: string
  infoIds: InfoId[]
}

interface StateProps {
  infos: Map<InfoId, Info>
}

interface DispatchProps {
  markRead: (infos: Info[]) => void
}

class ComponentWithInfo extends React.Component<OuterProps & StateProps & DispatchProps> {
  popupInfo(infos: Info[]) {
    //TODO: popup info - small box appear above. if longer than X, then has a show more to click and show more

    this.props.markRead(infos)
  }

  renderInfo(infos: Info[]) {
    if (infos.length > 0) {
      const allRead = infos
        .map((i) => i.meta && i.meta.read)
        .reduce((prev, curr) => { return prev && curr}, true)

      return <TouchableHighlight onPress={() => this.popupInfo(infos)}>
        <FontAwesome5 name="lightbulb" style={localStyles.icon} solid={allRead} />
      </TouchableHighlight>
    } else {
      return null
    }
  }

  render() {
    const {infoIds, text, infos} = this.props
    const matchedInfos = infoIds
      .map((id) => infos.get(id))
      .filter(function(i): i is Info {
        return i !== undefined
      })

    return <View style={localStyles.inline}>
      <Text style={styles.p}>{text}</Text>
      {this.renderInfo(matchedInfos)}
    </View>
  }
}

const localStyles = StyleSheet.create({
  inline: {
    flex: 1,
    flexDirection: 'row'
  },
  icon: {
    marginLeft: 5,
    color: "#111",
    fontSize: 16
  }
})

const mapStateToProps = (state: ReduxState) => {
  return {
    infos: state.info.infos
  };
}

export default connect(mapStateToProps, {markRead})(ComponentWithInfo);