import React from 'react';
import { NavigationScreenProp } from 'react-navigation';
import {StyleSheet, Text, View} from 'react-native';

import {Recipe} from 'app/models/Recipe'

interface OuterProps {
  navigation: NavigationScreenProp<any,any>
}

export default class RecipeScreen extends React.Component<OuterProps> {
  getRecipe(): Recipe {
    return this.props.navigation.getParam("recipe", null)
  }

  render() {
    const recipe = this.getRecipe()

    if (recipe) {
      return (
        <View>
          <Text style={[styles.text, styles.title]}>{recipe.title}</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={[styles.text, styles.title]}>Nothing to see here</Text>
        </View>
      );
    }
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
    color: '#111',
    paddingRight: 10
  },
});
