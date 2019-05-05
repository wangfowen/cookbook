import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';

import {Recipe} from 'app/models/Recipe'

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
    return <SectionList
      renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
      )}
      sections={[
        {title: 'Prep', data: this.getSteps("prep")},
        {title: 'Cook', data: this.getSteps("cook")},
      ]}
      keyExtractor={(item, index) => item + index}
    />
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold'
  }
});
