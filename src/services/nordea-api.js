import axios from 'axios';
import request from 'request-promise';
import constants from '../config/constants';

/*
  TODO:
    Make the apiCall use the accessToken which is passed from the frontend or not?
    Fix the promise because it's not right
    Uncomment things, it's only for eslint
 */
export const apiCall = async (route, method) => {
  const BASIC_URL = 'https://api.hackathon.developer.nordeaopenbanking.com/v2/';
  return new Promise(async (resolve, reject) => {
    switch (method) {
      case 'post':
        try {
          const body = await axios.post(`${BASIC_URL + route}`);
          resolve(body);
        } catch (e) {
          reject(e);
        }
        break;

      case 'get':
        try {
          const body = await axios.get(`${BASIC_URL + route}`);
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
    const response = await request.post('https://api.hackathon.developer.nordeaopenbanking.com/v1/authentication/access_token',
 {
      form: reqData,
      method: 'post',
      headers: {
        'X-IBM-Client-Id': constants.NORDEA_CLIENT_ID,
        'X-IBM-Client-Secret': constants.NORDEA_CLIENT_SECRET
      }
    });
    return JSON.parse(response).access_token;
  } catch (err) {
    console.log(err.response);
    throw err;
  }
};
