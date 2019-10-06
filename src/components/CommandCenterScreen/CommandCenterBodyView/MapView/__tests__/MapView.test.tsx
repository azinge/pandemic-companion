import * as React from 'react';
import renderer from 'react-test-renderer';

import MapView from '../MapView';

it('renders correctly', () => {
  const tree = renderer.create(<MapView />).toJSON();
  expect(tree).toMatchSnapshot();
});
