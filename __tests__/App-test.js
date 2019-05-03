/**
 * @format
 */

import 'react-native';
import React from './node_modules/react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from './node_modules/react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});
