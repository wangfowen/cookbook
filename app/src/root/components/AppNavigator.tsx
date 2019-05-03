import {createStackNavigator, createAppContainer} from 'react-navigation';

import SplashScreen from './SplashScreen';
import HomeNavigator from './HomeNavigator';
import PreferencesScreen from './PreferencesScreen';
import RecipeScreen from 'app/recipes/components/RecipeScreen';

const AppNavigator = createStackNavigator({
  Splash: {screen: SplashScreen},
  Home: {screen: HomeNavigator},
  Recipe: {screen: RecipeScreen},
  Preferences: {screen: PreferencesScreen}
}, {
  initialRouteName: "Splash"
});

const AppWithNavigation = createAppContainer(AppNavigator);

export default AppWithNavigation;