import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CommandCenterScreen from '../components/CommandCenterScreen';
import StatisticsDepartmentScreen from '../components/StatisticsDepartmentScreen';
import MissionControlScreen from '../components/MissionControlScreen';
import HomeScreen from '../components/HomeScreen';
import PageNotFoundScreen from '../components/PageNotFoundScreen';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/update'>
          <MissionControlScreen />
        </Route>
        <Route path='/overview'>
          <CommandCenterScreen />
        </Route>
        <Route path='/stats'>
          <StatisticsDepartmentScreen />
        </Route>
        <Route exact path='/'>
          <HomeScreen />
        </Route>
        <Route>
          <PageNotFoundScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
