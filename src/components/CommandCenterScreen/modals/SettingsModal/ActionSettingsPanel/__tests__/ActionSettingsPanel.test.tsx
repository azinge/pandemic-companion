import * as React from 'react';
import renderer from 'react-test-renderer';

import ActionSettingsPanel from '../ActionSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<ActionSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
