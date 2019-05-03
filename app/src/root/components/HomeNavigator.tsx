import {createBottomTabNavigator} from 'react-navigation';
import RecipeIndexScreen from 'app/recipes/components/RecipeIndexScreen';
import LearnIndexScreen from 'app/learn/components/LearnIndexScreen';

const HomeNavigator = createBottomTabNavigator({
  Recipes: {screen: RecipeIndexScreen},
  Learn: {screen: LearnIndexScreen},
}, {
  initialRouteName: "Recipes"
});

export default HomeNavigator;