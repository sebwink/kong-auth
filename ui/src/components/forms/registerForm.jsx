import Joi from 'joi-browser';

import Form from './base/form';

import routes from '../../routes';
import { postSignup } from '../../services/api';

export class RegisterForm extends Form {
  state = {
    data: {
      username: '',
      password: '',
      repeatedPassword: '',
      email: '',
    },
    errors: {},
  };
  
  inputs = {
    username: {
      label: 'Username',
      autoFocus: true,
    },
    password: {
      label: 'Password',
      type: 'password',
    },
    repeatedPassword: {
      label: 'Repeat your password',
      type: 'password',
    },
    email: {
      label: 'Email',
    },
  }

  config = {
    buttonLabel: 'Register',
  }

  schema = {
    username: Joi.string().min(4).max(30).required().label('Username'),
    password: Joi.string().min(8).max(18).required().label('Password'),
    repeatedPassword: Joi.string().min(8).max(18).required().label('Repeated Password'),
    email: Joi.string().email().required().label('E-Mail'),
  };
  
  crossValidate = [
    [(password, repeatedPassword) => password === repeatedPassword, 'password', 'repeatedPassword'],
  ]

  async submit() {
    const response = await postSignup(this.state.data);
    console.log(response);
    if (response.status === 201) {
      this.props.history.push(routes.confirmationMail);  
    } else if (response.status === 409) {
      const errors = { ...this.state.errors };
      const { message } = response.data;
      if (message === 'Username already in use.') {
        errors.username = message; 
      } else {
        errors.email = message;
      }
      this.setState({ errors });
    } else {
      console.log('Something really bad happened!');
      this.props.history.push(routes.registerPage);
    }
  }
}

export default RegisterForm;
