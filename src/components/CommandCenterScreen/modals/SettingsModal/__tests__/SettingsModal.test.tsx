import * as React from 'react';
import renderer from 'react-test-renderer';

import SettingsModal from '../SettingsModal';

it('renders correctly', () => {
  const tree = renderer.create(<SettingsModal />).toJSON();
  expect(tree).toMatchSnapshot();
});
