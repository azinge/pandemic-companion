import * as React from 'react';
import renderer from 'react-test-renderer';

import PlayerDetailView from '../PlayerDetailView';

it('renders correctly', () => {
  const tree = renderer.create(<PlayerDetailView />).toJSON();
  expect(tree).toMatchSnapshot();
});
