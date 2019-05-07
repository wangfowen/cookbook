import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';

import {Recipe, ComponentType, RecipesHelper, RecipeComponent} from 'app/models/Recipe'
import { ComponentId } from 'app/models/common';
import { Ingredient } from 'app/models/Ingredient';
import { Tool } from 'app/models/Tool';

import styles from './RecipeStyles'
import ComponentWithInfo from './ComponentWithInfo';

interface OuterProps {
  recipe: Recipe
  ingredients: Map<ComponentId, Ingredient>
  tools: Map<ComponentId, Tool>
}
export default class RecipeOverview extends React.Component<OuterProps> {
  getIngredients() {
    const components = Object.values(this.props.recipe.ingredients)
      .flat()
      .map((i) => this.props.recipe.components.get(i))
      .filter(function(i): i is RecipeComponent {
        return i !== undefined && i.type === ComponentType.Ingredient
      })

    return components.map((c) => {
      const i = this.props.ingredients.get(c.id)
      if (i) {
        return {
          text: RecipesHelper.componentDescriptor(c, i),
          infoIds: [i.infoId, c.customInfoId].filter((id) => id)
        }
      } else {
        return null
      }
    })
  }

  getTools() {
    const toolIds = this.props.recipe.toolIds
      .map((t) => {
        const tool = this.props.tools.get(t)
        if (tool) {
          return {
            text: tool.name,
            infoIds: [tool.infoId].filter((id) => id)
          }
        } else {
          return null
        }
      })

    return toolIds
  }

  renderIngredientsTools() {
    return <SectionList
      renderItem={({item, index, section}) => <ComponentWithInfo key={index} text={item.text} infoIds={item.infoIds} />}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.h3}>{title}</Text>
      )}
      sections={[
        {title: 'Ingredients', data: this.getIngredients()},
        {title: 'Tools', data: this.getTools()},
      ]}
      keyExtractor={(item, index) => item + index}
    />
  }

  render() {
    const {recipe} = this.props;

    return (
      <View style={styles.wrapper}>
        <Text style={[localStyles.description, styles.p]}>{recipe.description}</Text>
        <Text style={styles.p}>What you'll need:</Text>
        {this.renderIngredientsTools()}
        <Text style={styles.p}>Prep time: {RecipesHelper.hourify(recipe.prepMin)}</Text>
        <Text style={styles.p}>Cook time: {RecipesHelper.hourify(recipe.cookMin)}</Text>
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  description: {
    marginBottom: 10
  },
});
