import axios from 'axios';

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
