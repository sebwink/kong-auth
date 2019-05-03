import React from 'react';
import Grid from '../utils/grid';
import RegisterForm from '../forms/registerForm';

class RegisterPage extends Grid {
  columns = '6fr 5fr 6fr';
  rows = '1fr 3fr 1fr';
  components = [
    null, null, null,
    null, <RegisterForm history={this.props.history} />, null,
    null, null, null,
  ];
}

export default RegisterPage;
