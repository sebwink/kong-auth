import React from 'react';
import Grid from '../utils/grid';
import RegisterLoginForm from '../forms/registerLoginForm';

class RegisterLoginPage extends Grid {
  columns = '3fr 2fr 3fr';
  rows = '1fr 2fr 1fr';
  components = [
    null, null, null,
    null, <RegisterLoginForm location={this.props.location}/>, null,
    null, null, null, 
  ];
};

export default RegisterLoginPage;
