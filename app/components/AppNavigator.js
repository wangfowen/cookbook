import {createStackNavigator, createAppContainer} from 'react-navigation';

import SplashScreen from '../containers/SplashScreen.js';
import HomeNavigator from './HomeNavigator';
import PreferencesScreen from './PreferencesScreen';

const AppNavigator = createStackNavigator({
  Splash: {screen: SplashScreen},
  Home: {screen: HomeNavigator},
  Preferences: {screen: PreferencesScreen}
}, {
  initialRouteName: "Splash"
});

const AppWithNavigation = createAppContainer(AppNavigator);

export default AppWithNavigation;