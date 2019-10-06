import * as React from 'react';
import renderer from 'react-test-renderer';

import ActionsView from '../ActionsView';

it('renders correctly', () => {
  const tree = renderer.create(<ActionsView />).toJSON();
  expect(tree).toMatchSnapshot();
});
