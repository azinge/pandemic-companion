import * as React from 'react';
import renderer from 'react-test-renderer';

import RouteDetailView from '../RouteDetailView';

it('renders correctly', () => {
  const tree = renderer.create(<RouteDetailView />).toJSON();
  expect(tree).toMatchSnapshot();
});
