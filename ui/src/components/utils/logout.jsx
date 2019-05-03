import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import routes from '../../routes';
import { postLogout } from '../../services/api';

class Logout extends Component {
  state = {
    success: false,
  }

  async componentWillMount() {
    try {
      await postLogout();
      window.localStorage.removeItem('accessToken');
      this.setState({ success: true });
    } catch (error) {
      window.location = routes.homePage;
    }
  }

  render() {
    if (this.state.success) {
      return <Redirect to={routes.homePage} />;
    }
    return null;
  }
}

export default Logout;
