import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import RecipeIndexScreen from 'app/recipes/components/RecipeIndexScreen';
import LearnIndexScreen from 'app/learn/components/LearnIndexScreen';

const localStyles = StyleSheet.create({
  tabLabel: {
    fontSize: 16,
  },
  icon: {
    color: "#ccc",
    fontSize: 18
  }
});

const HomeNavigator = createBottomTabNavigator({
  Recipes: {
    screen: RecipeIndexScreen,
    navigationOptions: {
      tabBarIcon: ({}) => <FontAwesome5 style={localStyles.icon} name="utensils" />
    }
  },
  Learn: {
    screen: LearnIndexScreen,
    navigationOptions: {
      tabBarIcon: ({}) => <FontAwesome5 style={localStyles.icon} name="book-reader" />
    }
  },
}, {
  initialRouteName: "Recipes",
  tabBarOptions: {
    labelStyle: localStyles.tabLabel
  }
});

export default HomeNavigator;
