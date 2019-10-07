import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import HomeScreen from '../HomeScreen';

it('renders correctly', () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
