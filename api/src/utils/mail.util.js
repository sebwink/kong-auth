const nodemailer = require('nodemailer');

const MAIL_HOST = process.env.KONG_AUTH_MAIL_HOST;
const MAIL_FROM = process.env.KONG_AUTH_MAIL_FROM;
const MAIL_PORT = parseInt(process.env.KONG_AUTH_MAIL_PORT);
const MAIL_SECURE = (process.env.KONG_AUTH_MAIL_SECURE === 'true');
const MAIL_USER = process.env.KONG_AUTH_MAIL_USER;
const MAIL_PASSWORD = process.env.KONG_AUTH_MAIL_PASSWORD;

const PUBLIC_HOST = process.env.PUBLIC_HOST || 'https://dereg.net';

const SMTP_TRANSPORT = {
  host: MAIL_HOST,
  port: MAIL_PORT,
  secure: MAIL_SECURE,
  ignoreTLS: !MAIL_SECURE,
  /*
  auth: {
    user: MAIL_USER,
    pass: MAIL_PASSWORD,
  },
  */
}

const smtp = nodemailer.createTransport(SMTP_TRANSPORT);

const sendConfirmationLink = async (to, token, ui, tries = 3) => {
  let triesLeft = tries;
  let link;
  if (ui) {
    link = `${PUBLIC_HOST}/auth/ui/register/confirmation/${token}`;
  } else {
    link = `${PUBLIC_HOST}/auth/signup/confirm?token=${token}`;
  }
  const mail = {
    from: `"DeRegNet API" <${MAIL_FROM}>`,
    to,
    subject: 'DeRegNet sign up confirmation',
    text: link,
    html: `<button><a href=${link}>Confirm your E-Mail</a></button>`
  };
  while (triesLeft) {
    try {
      await smtp.sendMail(mail);
      break;
    } catch (error) {
      console.error(error);
      triesLeft--;
    }
  }
  if (!triesLeft) {
    console.log(`Could not send confirmation Link to ${to}`);
    // delete signup from db?
  } else {
    console.log(`Successfully send confirmation link to ${to}`);
  }
};

module.exports = {
  sendConfirmationLink,
};
