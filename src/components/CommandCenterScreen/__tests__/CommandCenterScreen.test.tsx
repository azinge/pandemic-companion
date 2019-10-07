import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import CommandCenterScreen from '../CommandCenterScreen';

it('renders correctly', () => {
  const tree = renderer.create(<CommandCenterScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
