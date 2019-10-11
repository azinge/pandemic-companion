import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import PlayerDeckView from '../PlayerDeckView';

it('renders correctly', () => {
  const tree = renderer.create(<PlayerDeckView />).toJSON();
  expect(tree).toMatchSnapshot();
});
