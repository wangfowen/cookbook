import React from 'react';
import {StyleSheet, View, Text, SectionList} from 'react-native';

import {Recipe, Step} from 'app/models/Recipe'
import styles from 'app/common/GlobalStyles'

interface OuterProps {
  recipe: Recipe
}
export default class RecipeSteps extends React.Component<OuterProps> {
  //TODO: handle tokenized info
  /*
  [lemon](i2) on [avocado](u1). Add {[salt](i3) and [pepper](Pepper)}(f3)
  //TODO: click one of the ingredient inputs, shows popup of how much you need -- show up as underline - reference components map for data to populate
  //TODO: click on the extra info, shows popup of the info -- show up with lightbulb -- reference infos map for data to populate
  //TODO: click one of the prior step inputs, scrolls up and highlights that step -- show up as underline - can do this with refs based on outputId
  */
  renderStep(step: Step, index: number) {
    return <Text style={styles.p} key={index}>{step.tokenizedInfo}</Text>
  }

  //TODO(future): add a picture of the ingredient in the popup?
  render() {
    return <View style={styles.wrapper}>
      <SectionList
        renderItem={({item, index, section}) => this.renderStep(item, index)}
        renderSectionHeader={({section: {title, data}}) => {
          if (data.length > 0) {
            return <Text style={styles.h3}>{title}</Text>
          } else {
            return null
          }
        }}
        sections={[
          {title: 'Prep', data: this.props.recipe.steps["prep"]},
          {title: 'Cook', data: this.props.recipe.steps["cook"]},
        ]}
        keyExtractor={(item, index) => item + index}
      />
    </View>
  }
}
