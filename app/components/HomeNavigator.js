import {createBottomTabNavigator} from 'react-navigation';
import RecipeIndexScreen from '../containers/RecipeIndexScreen';
import LearnIndexScreen from './LearnIndexScreen';

const HomeNavigator = createBottomTabNavigator({
  Recipe: RecipeIndexScreen,
  Learn: LearnIndexScreen,
}, {
  initialRouteName: "Recipe"
});

export default HomeNavigator;