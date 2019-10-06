import * as React from 'react';
import renderer from 'react-test-renderer';

import ObjectivesView from '../ObjectivesView';

it('renders correctly', () => {
  const tree = renderer.create(<ObjectivesView />).toJSON();
  expect(tree).toMatchSnapshot();
});
