import {createBottomTabNavigator} from 'react-navigation';
import RecipeIndexScreen from 'recipes/components/RecipeIndexScreen';
import LearnIndexScreen from 'learn/components/LearnIndexScreen';

const HomeNavigator = createBottomTabNavigator({
  Recipe: RecipeIndexScreen,
  Learn: LearnIndexScreen,
}, {
  initialRouteName: "Recipe"
});

export default HomeNavigator;