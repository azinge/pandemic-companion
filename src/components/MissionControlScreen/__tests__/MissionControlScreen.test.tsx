import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import MissionControlScreen from '../MissionControlScreen';

it('renders correctly', () => {
  const tree = renderer.create(<MissionControlScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
