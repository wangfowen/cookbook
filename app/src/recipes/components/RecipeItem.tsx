import React from 'react';
import {StyleSheet, Text, ImageBackground, TouchableHighlight} from 'react-native';

import {Recipe, RecipesHelper} from 'app/models/Recipe'

interface OuterProps {
  recipe: Recipe
  onPress: () => void
}
export default class RecipeItem extends React.Component<OuterProps> {

  render() {
    const {recipe} = this.props;

    return (
      <TouchableHighlight onPress={this.props.onPress}>
        <ImageBackground source={{uri: recipe.heroImage}} style={styles.heroImage}>
          <Text style={styles.text}>Prep: {RecipesHelper.hourify(recipe.prepMin)}</Text>
          <Text style={styles.text}>Cook: {RecipesHelper.hourify(recipe.cookMin)}</Text>
          <Text style={[styles.text, styles.title]}>{recipe.title}</Text>
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
    color: '#eee',
    textShadowColor: '#111',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
    paddingRight: 10
  },
  heroImage: {
    backgroundColor:'transparent',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flex: 1,
    width: undefined,
    height: 200,
    resizeMode: 'cover'
  }
});
