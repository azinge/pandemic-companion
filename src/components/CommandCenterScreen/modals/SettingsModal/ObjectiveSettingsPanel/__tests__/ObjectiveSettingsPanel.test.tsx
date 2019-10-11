import * as React from 'react';
import renderer from 'react-test-renderer';

import ObjectiveSettingsPanel from '../ObjectiveSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<ObjectiveSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
