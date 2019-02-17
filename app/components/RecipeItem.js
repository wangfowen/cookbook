import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class RecipeItem extends Component {
  render() {
    const {recipe} = this.props;

    return (
      <View style={styles.item}>
        <Text style={styles.title}>{recipe.title}</Text>
        <Text style={styles.ingredients}>{recipe.ingredients}</Text>
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
  ingredients: {
    fontSize: 16
  }
});
