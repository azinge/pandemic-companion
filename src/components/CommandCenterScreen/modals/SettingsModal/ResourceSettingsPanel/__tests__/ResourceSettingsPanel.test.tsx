import * as React from 'react';
import renderer from 'react-test-renderer';

import ResourceSettingsPanel from '../ResourceSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<ResourceSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
