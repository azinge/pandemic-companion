import * as React from 'react';
import renderer from 'react-test-renderer';

import PageNotFoundScreen from '../PageNotFoundScreen';

it('renders correctly', () => {
  const tree = renderer.create(<PageNotFoundScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
