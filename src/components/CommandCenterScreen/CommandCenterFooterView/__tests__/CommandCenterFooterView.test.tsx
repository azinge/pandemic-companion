import * as React from 'react';
import renderer from 'react-test-renderer';

import CommandCenterFooterView from '../CommandCenterFooterView';

it('renders correctly', () => {
  const tree = renderer.create(<CommandCenterFooterView />).toJSON();
  expect(tree).toMatchSnapshot();
});
