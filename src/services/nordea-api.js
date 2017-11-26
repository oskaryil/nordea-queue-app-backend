import request from 'request-promise';
import constants from '../config/constants';

/*
  TODO:
    Make the apiCall use the accessToken which is passed from the frontend or not?
    Fix the promise because it's not right
    Uncomment things, it's only for eslint
 */
// eslint-disable-next-line
export const apiCall = async (route, method, access_token) => {
  const BASIC_URL = 'https://api.hackathon.developer.nordeaopenbanking.com/v2';
  switch (method) {
    case 'post':
      try {
        const response = await request.post(`${BASIC_URL}${route}`, {
          headers: {
            access_token,
            'X-IBM-Client-Id': constants.NORDEA_CLIENT_ID,
            'X-IBM-Client-Secret': constants.NORDEA_CLIENT_SECRET,
          },
        });
        return response;
      } catch (e) {
        throw e;
      }

    case 'get':
      try {
        const response = await request.get(`${BASIC_URL}${route}`, {
          headers: {
            'X-IBM-Client-Id': constants.NORDEA_CLIENT_ID,
            'X-IBM-Client-Secret': constants.NORDEA_CLIENT_SECRET,
            access_token,
          },
        });

        return response;
      } catch (e) {
        throw e;
      }

    default:
      break;
  }
};

export const getAccessToken = async accessCode => {
  try {
    const reqData = {
      code: accessCode,
      redirect_uri: 'http://localhost:8080/nordeacallback',
    };
    const response = await request.post(
      'https://api.hackathon.developer.nordeaopenbanking.com/v1/authentication/access_token',
      {
        form: reqData,
        method: 'post',
        headers: {
          'X-IBM-Client-Id': constants.NORDEA_CLIENT_ID,
          'X-IBM-Client-Secret': constants.NORDEA_CLIENT_SECRET,
        },
      },
    );
    return JSON.parse(response).access_token;
  } catch (err) {
    throw err;
  }
};
