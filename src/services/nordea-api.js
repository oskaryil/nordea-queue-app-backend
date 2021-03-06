import axios from 'axios';

import constants from '../config/constants';
/*
  TODO:
    Make the apiCall use the accessToken which is passed from the frontend or not?
    Fix the promise because it's not right
    Uncomment things, it's only for eslint
 */
// eslint-disable-next-line
export const apiCall = async (method, route, access_token) => {
  const BASIC_URL = 'https://api.hackathon.developer.nordeaopenbanking.com/v2';
  return new Promise(async (resolve, reject) => {
    switch (method) {
      case 'post':
        try {
          const body = await axios({
            method: 'post',
            headers: {
              access_token,
              'X-IBM-Client-Id': constants.NORDEA_CLIENT_ID,
              'X-IBM-Client-Secret': constants.NORDEA_CLIENT_SECRET,
            },
            url: `${BASIC_URL + route}`,
          });
          resolve(body);
        } catch (e) {
          reject(e);
        }
        break;

      case 'get':
        try {
          const body = await axios({
            method: 'get',
            headers: {
              access_token,
              'X-IBM-Client-Id': constants.NORDEA_CLIENT_ID,
              'X-IBM-Client-Secret': constants.NORDEA_CLIENT_SECRET,
            },
            url: `${BASIC_URL + route}`,
          });
          resolve(body);
        } catch (e) {
          reject(e);
        }

        break;
      default:
        return 0;
    }
  });
};

export const getAccessToken = async accessCode => {
  try {
    const reqData = {
      code: accessCode,
      redirect_uri: 'http://localhost:8080/nordeacallback',
    };
    const { data } = await axios.post(
      'https://api.hackathon.developer.nordeaopenbanking.com/v1/authentication/access_token',
      reqData,
    );
    return data;
  } catch (err) {
    throw err;
  }
};
