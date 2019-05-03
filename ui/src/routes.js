import route from './utils/routing';

const homePage = route('/');
const loginPage = route('/login');
const registerPage = route('/register');
const confirmationMail = route('/register/confirmation/mail/send');
const confirmationLink = route('/register/confirmation/:token');
const registerLoginPage = route('/register/confirmation/login');
const logout = route('/logout');

export default {
  homePage,
  loginPage,
  registerPage,
  confirmationMail,
  confirmationLink,
  registerLoginPage,
  logout,
};
