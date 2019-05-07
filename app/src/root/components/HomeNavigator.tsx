import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation';
import RecipeIndexScreen from 'app/recipes/components/RecipeIndexScreen';
import LearnIndexScreen from 'app/learn/components/LearnIndexScreen';

const localStyles = StyleSheet.create({
  tabLabel: {
    fontSize: 18
  },
});

const HomeNavigator = createBottomTabNavigator({
  Recipes: {screen: RecipeIndexScreen},
  Learn: {screen: LearnIndexScreen},
}, {
  initialRouteName: "Recipes",
  tabBarOptions: {
    labelStyle: localStyles.tabLabel
  }
});

export default HomeNavigator;
