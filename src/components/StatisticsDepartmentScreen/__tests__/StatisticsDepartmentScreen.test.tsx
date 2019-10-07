import * as React from 'react';
// @ts-ignore
import renderer from 'react-test-renderer';

import StatisticsDepartmentScreen from '../StatisticsDepartmentScreen';

it('renders correctly', () => {
  const tree = renderer.create(<StatisticsDepartmentScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
