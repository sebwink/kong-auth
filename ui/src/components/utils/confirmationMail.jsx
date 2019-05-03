import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import routes from '../../routes';

const ConfirmationMail = (props) => {
  toast.success('Thank you!');
  toast.success('Check your E-Mail to confirm your account.');
  return <Redirect to={routes.homePage} />;
};

export default ConfirmationMail;
