import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../routes';

import { getSignupConfirm } from '../../services/api';

class ConfirmationLink extends Component {
  state = {
    validToken: undefined, 
  }

  async componentDidMount() {
    const { token } = this.props.match.params;
    const validToken = await getSignupConfirm(token);
    this.setState({ validToken });
  }
    
  render() {
    if (this.state.validToken === undefined) {
      return null;
    } else if (!this.state.validToken) {
      toast.error('Sorry, your activation link expired.');
      toast.warning('Give it another try, maybe?');
      return <Redirect to={routes.registerPage} /> 
    }
    toast.success('Thank you!');
    toast.success('E-Mail successfully confirmed.');
    toast.warning('Log in NOW to activate your account.', { autoClose: false });
    const { token } = this.props.match.params;
    return <Redirect to={{
      pathname: routes.registerLoginPage,
      state: { token },
    }} />
  }
}

export default ConfirmationLink;
