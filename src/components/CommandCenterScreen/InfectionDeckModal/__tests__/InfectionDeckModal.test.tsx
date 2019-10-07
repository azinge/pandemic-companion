import * as React from 'react';
import renderer from 'react-test-renderer';

import InfectionDeckModal from '../InfectionDeckModal';

it('renders correctly', () => {
  const tree = renderer.create(<InfectionDeckModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
