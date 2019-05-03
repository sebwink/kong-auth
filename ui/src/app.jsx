import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';

import { PAGE_TITLE } from './config';
import Navbar from './components/navbar';
import AppRouter from './router';

import 'react-toastify/dist/ReactToastify.css';

class App extends Component {
  componentDidMount() {
    document.title = PAGE_TITLE;
  }

  render() {
    return (
      <React.Fragment>
        <Navbar user={undefined} />
        <ToastContainer />
        <AppRouter />
      </React.Fragment>
    );
  }
}

export default App;
