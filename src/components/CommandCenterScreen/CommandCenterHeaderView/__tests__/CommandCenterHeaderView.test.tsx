import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import CommandCenterHeaderView from '../CommandCenterHeaderView';

it('renders correctly', () => {
  const tree = renderer.create(<CommandCenterHeaderView />).toJSON();
  expect(tree).toMatchSnapshot();
});
