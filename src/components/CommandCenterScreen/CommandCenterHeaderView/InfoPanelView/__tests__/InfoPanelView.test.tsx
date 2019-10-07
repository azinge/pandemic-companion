import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import InfoPanelView from '../InfoPanelView';

it('renders correctly', () => {
  const tree = renderer.create(<InfoPanelView />).toJSON();
  expect(tree).toMatchSnapshot();
});
