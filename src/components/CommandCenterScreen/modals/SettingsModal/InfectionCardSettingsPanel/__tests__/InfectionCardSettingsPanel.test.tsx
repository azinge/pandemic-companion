import * as React from 'react';
import renderer from 'react-test-renderer';

import InfectionCardSettingsPanel from '../InfectionCardSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<InfectionCardSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
