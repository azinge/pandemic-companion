import * as React from 'react';
import renderer from 'react-test-renderer';

import PlayerSettingsPanel from '../PlayerSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<PlayerSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
