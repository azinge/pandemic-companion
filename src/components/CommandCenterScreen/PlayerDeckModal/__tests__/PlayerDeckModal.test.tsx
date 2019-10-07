import * as React from 'react';
import renderer from 'react-test-renderer';

import PlayerDeckModal from '../PlayerDeckModal';

it('renders correctly', () => {
  const tree = renderer.create(<PlayerDeckModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
