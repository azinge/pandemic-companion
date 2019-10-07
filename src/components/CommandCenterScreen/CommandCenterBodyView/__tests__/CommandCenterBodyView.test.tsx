import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import CommandCenterBodyView from '../CommandCenterBodyView';

it('renders correctly', () => {
  const tree = renderer.create(<CommandCenterBodyView />).toJSON();
  expect(tree).toMatchSnapshot();
});
