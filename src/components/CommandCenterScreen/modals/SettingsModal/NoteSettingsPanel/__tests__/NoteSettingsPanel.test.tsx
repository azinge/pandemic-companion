import * as React from 'react';
import renderer from 'react-test-renderer';

import NoteSettingsPanel from '../NoteSettingsPanel';

it('renders correctly', () => {
  const tree = renderer.create(<NoteSettingsPanel />).toJSON();
  expect(tree).toMatchSnapshot();
});
