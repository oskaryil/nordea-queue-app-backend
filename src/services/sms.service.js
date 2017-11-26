import request from 'request-promise';

import constants from '../config/constants';

export const sendSMS = async (from, to, message) => {
  try {
    const { response } = await request.post('https://api.46elks.com/a1/SMS', {
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
    });
    return response;
  } catch (err) {
    if (err) {
      // eslint-disable-next-line no-console
      console.error(err);
    } else {
      // eslint-disable-next-line no-console
      console.log('Success!');
    }
  }
};
