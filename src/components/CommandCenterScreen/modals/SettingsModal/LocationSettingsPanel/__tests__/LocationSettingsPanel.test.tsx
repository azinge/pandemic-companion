import * as React from 'react';
import renderer from 'react-test-renderer';

import LocationSettingsPanel from '../LocationSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<LocationSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
