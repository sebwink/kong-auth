import React from 'react';
import Grid from '../utils/grid';
import LoginForm from '../forms/loginForm';

class LoginPage extends Grid {
  columns = '3fr 2fr 3fr';
  rows = '1fr 2fr 1fr';
  components = [
    null, null, null,
    null, <LoginForm />, null,
    null, null, null, 
  ];
};

export default LoginPage;
