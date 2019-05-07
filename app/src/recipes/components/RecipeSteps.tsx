import React from 'react';
import {StyleSheet, View, Text, SectionList} from 'react-native';

import {Recipe} from 'app/models/Recipe'
import styles from 'app/common/GlobalStyles'

interface OuterProps {
  recipe: Recipe
}
export default class RecipeSteps extends React.Component<OuterProps> {
  getSteps(category: "prep" | "cook") {
    const steps = this.props.recipe.steps[category]

    //TODO: parse info
    return steps.map((s) => s.info)
  }

  render() {
    return <View style={styles.wrapper}>
      <SectionList
        renderItem={({item, index, section}) => <Text style={styles.p} key={index}>{item}</Text>}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.h3}>{title}</Text>
        )}
        sections={[
          {title: 'Prep', data: this.getSteps("prep")},
          {title: 'Cook', data: this.getSteps("cook")},
        ]}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  }
}
