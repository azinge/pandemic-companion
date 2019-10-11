import * as React from 'react';
import renderer from 'react-test-renderer';

import DetailView from '../DetailView';

it('renders correctly', () => {
  const tree = renderer.create(<DetailView />).toJSON();
  expect(tree).toMatchSnapshot();
});
