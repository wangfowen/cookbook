import React from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';
import { Tooltip } from 'react-native-elements';
import { connect } from 'react-redux'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { withNavigation, NavigationScreenProp } from 'react-navigation';

import { ReduxState } from 'app/CombinedReducer';
import { InfoId, Info } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'
import { markRead } from 'app/learn/duck/actions';

interface OuterProps {
  text: string
  infoIds: InfoId[]
  navigation: NavigationScreenProp<any,any>
}

interface StateProps {
  infos: Map<InfoId, Info>
}

interface DispatchProps {
  markRead: (infos: Info[]) => void
}

class ComponentWithInfo extends React.Component<OuterProps & StateProps & DispatchProps> {
  markRead(infos: Info[]) {
    this.props.markRead(infos)
  }

  popupInfo(infos: Info[]) {
    this.props.navigation.navigate("Info", {infos: infos})

    this.markRead(infos)
  }

  renderInfo(infos: Info[]) {
    if (infos.length > 0) {
      //just one short tip
      if (infos.length === 1 && infos[0].content.length < 35) {
        const info = infos[0]
        return <Tooltip withOverlay={false} popover={<Text>{info.content}</Text>} onOpen={() => this.markRead(infos)} width={40 + (info.content.length * 6)}>
          <FontAwesome5 name="lightbulb" style={localStyles.icon} solid={info.meta && info.meta.read} />
        </Tooltip>
      //long tip. open another page
      } else {
        const allRead = infos
          .map((i) => i.meta && i.meta.read)
          .reduce((prev, curr) => { return prev && curr}, true)

        return <TouchableHighlight onPress={() => this.popupInfo(infos)}>
          <FontAwesome5 name="lightbulb" style={localStyles.icon} solid={allRead} />
        </TouchableHighlight>
      }
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

export default connect(mapStateToProps, {markRead})(withNavigation(ComponentWithInfo));