// import axios from 'axios';

/*
  TODO:
    use nordea-api.js service to create api calls
 */
export const fetchAccounts = () => {
  const accounts = [
    {
      accountName: 'savings',
      balance: '1233-EUR',
    },
    {
      accountName: 'savings',
      balance: '1721-SEK',
    },
    {
      accountName: 'party',
      balance: '1243-BTC',
    },
  ];
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    resolve(accounts);
  });
};
