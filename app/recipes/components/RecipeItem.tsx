import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {Recipe} from 'app/models/Recipe'

interface OuterProps {
  recipe: Recipe
}

export default class RecipeItem extends React.Component<OuterProps> {
  render() {
    const {recipe} = this.props;

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.heroImage}>{recipe.heroImage}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#ddd',
    padding: 10
  },
  title: {
    fontSize: 20,
    height: 40
  },
  heroImage: {
    fontSize: 16
  }
});
