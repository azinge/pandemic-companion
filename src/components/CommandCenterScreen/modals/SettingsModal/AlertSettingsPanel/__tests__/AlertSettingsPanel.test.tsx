import * as React from 'react';
import renderer from 'react-test-renderer';

import AlertSettingsPanel from '../AlertSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<AlertSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
