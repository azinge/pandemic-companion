import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import CommandCenterFooterView from '../CommandCenterFooterView';

it('renders correctly', () => {
  const tree = renderer.create(<CommandCenterFooterView />).toJSON();
  expect(tree).toMatchSnapshot();
});
