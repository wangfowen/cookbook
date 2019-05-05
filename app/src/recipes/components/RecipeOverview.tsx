import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';

import {Recipe, ComponentType, RecipesHelper} from 'app/models/Recipe'

interface OuterProps {
  recipe: Recipe
}
export default class RecipeOverview extends React.Component<OuterProps> {
  getIngredients() {
    //TODO: get the actual ingredient
    const ingredientIds = Object.values(this.props.recipe.ingredients)
      .flat()
      .filter((i) => i.type === ComponentType.Ingredient)
      .map((i) => RecipesHelper.componentAmount(i))

    return ingredientIds
  }

  getTools() {
    //TODO: get the actual tools
    const toolIds = this.props.recipe.toolIds

    return toolIds
  }

  renderIngredientsTools() {
    return <SectionList
      renderItem={({item, index, section}) => <Text key={index}>{item}</Text>}
      renderSectionHeader={({section: {title}}) => (
        <Text style={styles.header}>{title}</Text>
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
      <View>
        <Text>{recipe.description}</Text>
        <Text>What you'll need:</Text>
        {this.renderIngredientsTools()}
        <Text>Prep time: {RecipesHelper.hourify(recipe.prepMin)}</Text>
        <Text>Cook time: {RecipesHelper.hourify(recipe.cookMin)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontWeight: 'bold'
  }
});
