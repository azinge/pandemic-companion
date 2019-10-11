import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CommandCenterScreen from '../components/CommandCenterScreen';

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
          <CommandCenterScreen />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
