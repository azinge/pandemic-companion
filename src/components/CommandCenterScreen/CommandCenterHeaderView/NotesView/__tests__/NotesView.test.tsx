import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import NotesView from '../NotesView';

it('renders correctly', () => {
  const tree = renderer.create(<NotesView />).toJSON();
  expect(tree).toMatchSnapshot();
});
