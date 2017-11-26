// import axios from 'axios';
import { apiCall } from './nordea-api';
/*
  TODO:
    use nordea-api.js service to create api calls
 */
// eslint-disable-next-line
export const fetchAccounts = async access_token => {
  const URI = '/accounts';
  const accounts = await apiCall('get', URI, access_token);
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    resolve(accounts);
  });
};

// eslint-disable-next-line
export const fetchSingleAccount = (accountId, access_token) => {
  const URI = `/accounts/${accountId}`;

  const account = apiCall('get', URI, access_token);
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    resolve(account);
  });
};
