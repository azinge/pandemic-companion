import * as React from 'react';
import renderer from 'react-test-renderer';

import StatisticsDepartmentScreen from '../StatisticsDepartmentScreen';

it('renders correctly', () => {
  const tree = renderer.create(<StatisticsDepartmentScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
