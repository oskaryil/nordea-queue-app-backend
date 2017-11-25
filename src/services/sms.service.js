import request from 'request';

import constants from '../config/constants';

export const sendSMS = (from, to, message) => {
  request.post(
    'https://api.46elks.com/a1/SMS',
    {
      auth: {
        user: constants.SMS_API_USERNAME,
        pass: constants.SMS_API_PASSWORD,
      },

      form: {
        from,
        to,
        message,
        flashsms: 'no', // Read more about it here: https://www.46elks.com/docs#flashsms
      },
    },
    (err, response, body) => {
      if (err) {
        // eslint-disable-next-line no-console
        console.error(err);
      } else if (response.statusCode !== 200) {
        // eslint-disable-next-line no-console
        console.error('Error', response.statusCode, body);
      } else {
        // eslint-disable-next-line no-console
        console.log('Success!');
      }
    },
  );
};
