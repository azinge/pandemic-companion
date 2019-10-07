import * as React from 'react';
import renderer from 'react-test-renderer';

import PlayersModal from '../PlayersModal';

it('renders correctly', () => {
  const tree = renderer.create(<PlayersModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
