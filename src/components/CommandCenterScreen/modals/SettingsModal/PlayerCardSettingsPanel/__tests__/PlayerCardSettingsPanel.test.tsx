import * as React from 'react';
import renderer from 'react-test-renderer';

import PlayerCardSettingsPanel from '../PlayerCardSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<PlayerCardSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
