import {createBottomTabNavigator} from 'react-navigation';
import RecipeIndexScreen from 'app/recipes/components/RecipeIndexScreen';
import LearnIndexScreen from 'app/learn/components/LearnIndexScreen';

const HomeNavigator = createBottomTabNavigator({
  Recipe: RecipeIndexScreen,
  Learn: LearnIndexScreen,
}, {
  initialRouteName: "Recipe"
});

export default HomeNavigator;