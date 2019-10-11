import * as React from 'react';
import renderer from 'react-test-renderer';

import LocationDetailView from '../LocationDetailView';

it('renders correctly', () => {
  const tree = renderer.create(<LocationDetailView />).toJSON();
  expect(tree).toMatchSnapshot();
});
