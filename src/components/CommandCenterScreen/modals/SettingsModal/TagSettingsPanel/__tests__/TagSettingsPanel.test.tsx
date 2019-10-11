import * as React from 'react';
import renderer from 'react-test-renderer';

import TagSettingsPanel from '../TagSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<TagSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
