import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';

import {Recipe, ComponentType, RecipesHelper, RecipeComponent} from 'app/models/Recipe'
import { ComponentId } from 'app/models/common';
import { Ingredient } from 'app/models/Ingredient';
import { Tool } from 'app/models/Tool';

import styles from 'app/common/GlobalStyles'
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
        <Text style={[styles.h3, localStyles.header]}>{title}</Text>
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

    //TODO(future): add in ability to adjust the servings
    //TODO(future): add "add to shopping list"
    //TODO(future): add in schedule prep/eat time
    return (
      <View style={styles.wrapper}>
        <Text style={[localStyles.description, styles.p]}>{recipe.description}</Text>
        <View style={localStyles.times}>
          <Text style={[styles.p, localStyles.time]}>Prep time: {RecipesHelper.hourify(recipe.prepMin)}</Text>
          <Text style={[styles.p, localStyles.time]}>Cook time: {RecipesHelper.hourify(recipe.cookMin)}</Text>
        </View>
        {this.renderIngredientsTools()}
      </View>
    );
  }
}

const localStyles = StyleSheet.create({
  description: {
    marginBottom: 10
  },
  header: {
    marginTop: 15
  },
  time: {
    marginRight: 10
  },
  times: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10
  }
});
