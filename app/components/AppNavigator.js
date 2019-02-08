import {createStackNavigator, createAppContainer} from 'react-navigation';

import SplashScreen from '../containers/SplashScreen.js';
import HomeNavigator from './HomeNavigator';

const AppNavigator = createStackNavigator({
  Splash: {screen: SplashScreen},
  Home: {screen: HomeNavigator}
}, {
  initialRouteName: "Splash"
});

const AppWithNavigation = createAppContainer(AppNavigator);

export default AppWithNavigation;