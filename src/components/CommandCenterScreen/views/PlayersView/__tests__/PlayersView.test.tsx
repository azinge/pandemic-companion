import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import PlayersView from '../PlayersView';

it('renders correctly', () => {
  const tree = renderer.create(<PlayersView />).toJSON();
  expect(tree).toMatchSnapshot();
});
