import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

import { PAGE_TITLE } from '../config';
import routes from '../routes';

import './styles/navbar.css';

class Navbar extends Component {

  renderIfNo(user) {
    if (user) {
      return null;
    }
    return (
      <React.Fragment>
     	 	<NavLink
     	    className="nav-item nav-link"
          to={routes.loginPage} 
     	 	>
     	    Login
				</NavLink>
     	 	<NavLink
     	    className="nav-item nav-link"
          to={routes.registerPage} 
     	 	>
     	    Register
				</NavLink>
      </React.Fragment>
    );
  }

  renderIf(user) {
    if (!user) {
      return null;
    }
    return null
  }

  render() {
    const { user } = this.props;
    return (
      <nav className="navbar navbar-default navbar-expand-lg navbar-light">
        <NavLink 
          className="nav-item nav-link"
          to={routes.homePage}
        >
          <button 
            className="navbar-brand btn btn-link"
          >
          {"  "}{PAGE_TITLE}
          </button>
        </NavLink>
        <div className="collapse navbar-collapse" id="navbarNav">
          {this.renderIfNo(user)}
          {this.renderIf(user)}
			  </div>
		  </nav>
    );
  }
};

export default Navbar;
