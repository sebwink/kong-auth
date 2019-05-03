import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from './routes';

import LoginPage from './components/pages/loginPage';
import RegisterPage from './components/pages/registerPage';
import ConfirmationMail from './components/utils/confirmationMail';
import ConfirmationLink from './components/utils/confirmationLink';
import RegisterLoginPage from './components/pages/registerLoginPage';
import Logout from './components/utils/logout';

const AppRouter = () => {
  return (
    <Switch>
      <Route path={routes.loginPage} exact component={LoginPage} />
      <Route path={routes.registerPage} exact component={RegisterPage} />
      <Route path={routes.confirmationMail} exact component={ConfirmationMail} />
      <Route path={routes.registerLoginPage} exact component={RegisterLoginPage} />
      <Route path={routes.confirmationLink} exact component={ConfirmationLink} />
      <Route path={routes.logout} exact component={Logout} />
      <Redirect to={routes.loginPage} />
    </Switch>
  );
}

export default AppRouter;
