import React from 'react';
import {StyleSheet, Text, View, ImageBackground, TouchableHighlight} from 'react-native';

import {Recipe, RecipesHelper} from 'app/models/Recipe'

interface OuterProps {
  recipe: Recipe
  onPress: () => void
}
export default class RecipeItem extends React.Component<OuterProps> {
  calcIngredients(ingredients: object) {
    return Object.values(ingredients).flat().length
  }

  render() {
    const {recipe} = this.props;

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <ImageBackground source={{uri: recipe.heroImage}} style={styles.heroImage}>
          <View style={styles.container}>
            <Text style={styles.text}>{this.calcIngredients(recipe.ingredients)} ingredients</Text>
            <Text style={styles.text}>Prep: {RecipesHelper.hourify(recipe.prepMin)}</Text>
            <Text style={styles.text}>Cook: {RecipesHelper.hourify(recipe.cookMin)}</Text>
            <Text style={[styles.text, styles.title]}>{recipe.title}</Text>
          </View>
        </ImageBackground>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    height: 40,
  },
  text: {
    fontSize: 16,
    height: 32,
    color: '#ccc',
    paddingRight: 10
  },
  heroImage: {
    flex: 1,
    width: undefined,
    height: 200,
    resizeMode: 'cover'
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.4)',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  }
});
