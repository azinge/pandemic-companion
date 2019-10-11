import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import TraitsView from '../TraitsView';

it('renders correctly', () => {
  const tree = renderer.create(<TraitsView />).toJSON();
  expect(tree).toMatchSnapshot();
});
