import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, FlatList, ScrollView, View} from 'react-native';
import { connect } from 'react-redux'

import { ReduxState } from 'app/CombinedReducer';
import { Info, InfoId } from 'app/models/Info';
import styles from 'app/common/GlobalStyles'
import InfoPreview from './InfoPreview';

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}


interface StateProps {
  infos: Map<InfoId, Info>
}

class InfoScreen extends React.Component<OuterProps & StateProps> {
  //TODO: test
  appendInfoAndChildren(info: Info): Info[] {
    if (info && info.subInfoIds) {
      return info.subInfoIds
        .map((id) => this.props.infos.get(id))
        .reduce((arr, child) => {
          if (child) {
            arr = arr.concat(this.appendInfoAndChildren(child))
          }

          return arr
        }, [info])
    } else if (info) {
      return [info]
    } else {
      return []
    }
  }

  getParamInfos(): Info[] {
    return this.props.navigation.getParam("infos", [])
  }

  //TODO(improve): is there a better way to not have missing key error?
  listify(infos: Info[]) {
    return infos.map((info) => Object.assign({}, info, {key: info.id}))
  }

  getInfos(): Info[] {
    return this.listify(this.getParamInfos().reduce((arr: Info[], info: Info) => {
      arr = arr.concat(this.appendInfoAndChildren(info))
      return arr
    }, []))
  }

  //TODO: test
  getParents(): Info[] {
    return this.listify(this.getParamInfos()
      .map((info) => {
        if (info && info.parentInfoIds) {
          return info.parentInfoIds.map((id) => this.props.infos.get(id))
        } else {
          return []
        }
      })
      .flat()
      .filter(function(info): info is Info {return info !== undefined}))
  }

  //TODO: parse info - images, line breaks, videos
  //TODO: when scroll to end of the text, mark it as read. if already read, default closed
  //TODO: toggle close accordion 
  renderInfo(info: Info) {
    const title = info.title ? <Text style={[styles.h3]}>{info.title}</Text> : null
    return <View>
      {title}
      <Text style={[styles.p, localStyles.content]}>{info.content}</Text>
    </View>
  }

  //TODO(future): how download media content to device? and then how reference them dynamically? saving as string is not great
  render() {
    const infos = this.getInfos()
    const parents = this.getParents()
    if (infos) {

      return <ScrollView style={[styles.wrapper]}>
        <FlatList 
          data={infos} 
          renderItem={({item}) => this.renderInfo(item)}
        />
        {parents.length > 0 ? <View style={localStyles.learnMore}><Text style={[styles.h3]}>Learn more:</Text></View>: null}
        <FlatList 
          data={parents} 
          renderItem={({item}) => <InfoPreview info={item} />}
          style={localStyles.parents}
        />
      </ScrollView>
    } else {
      return null
    }
  }
}

const localStyles = StyleSheet.create({
  content: {
    marginBottom: 20
  },
  learnMore: {
    paddingTop: 20,
    borderTopColor: "#ccc",
    borderTopWidth: 1,
  },
  parents: {
    marginBottom: 40
  }
})

const mapStateToProps = (state: ReduxState) => {
  return {
    infos: state.info.infos,
  };
}

export default connect(mapStateToProps)(InfoScreen);
