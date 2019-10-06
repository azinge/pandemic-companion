import * as React from 'react';
import renderer from 'react-test-renderer';

import InfectionDeckView from '../InfectionDeckView';

it('renders correctly', () => {
  const tree = renderer.create(<InfectionDeckView />).toJSON();
  expect(tree).toMatchSnapshot();
});
