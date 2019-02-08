import {createBottomTabNavigator} from 'react-navigation';
import RecipeIndexScreen from './RecipeIndexScreen';
import LearnIndexScreen from './LearnIndexScreen';

const HomeNavigator = createBottomTabNavigator({
  Recipe: RecipeIndexScreen,
  Learn: LearnIndexScreen,
});

export default HomeNavigator;