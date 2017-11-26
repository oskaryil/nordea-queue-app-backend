// import axios from 'axios';
// eslint-disable-next-line
import { apiCall } from './nordea-api';
/*
  TODO:
    use nordea-api.js service to create api calls
 */
// eslint-disable-next-line
export const fetchAccounts = async access_token => {
  const accounts = [
    {
      _id: 'FI6593857450293470-EUR',
      country: 'FI',
      accountNumber: {
        value: 'FI6593857450293470',
        _type: 'IBAN',
      },
      currency: 'EUR',
      ownerName: 'Oy Company AB',
      product: 'SHEKKITILI',
      accountType: 'Current',
      availableBalance: '6283.81',
      bookedBalance: '6283.81',
      valueDatedBalance: '6283.81',
      _links: [
        {
          rel: 'details',
          href: '/v2/accounts/FI6593857450293470-EUR',
        },
        {
          rel: 'transactions',
          href: '/v2/accounts/FI6593857450293470-EUR/transactions',
        },
      ],
    },
    {
      _id: 'FI7473834510057469-EUR',
      country: 'FI',
      accountNumber: {
        value: 'FI7473834510057469',
        _type: 'IBAN',
      },
      currency: 'EUR',
      ownerName: 'Oy Company AB',
      product: 'SHEKKITILI',
      accountType: 'Current',
      availableBalance: '1123.60',
      bookedBalance: '1111.50',
      valueDatedBalance: '1111.50',
      _links: [],
    },
  ];
  // eslint-disable-next-line no-unused-vars
  return accounts;
};

// eslint-disable-next-line
export const fetchSingleAccount = (accountId, access_token) => {
  const account = {
    _id: 'FI6593857450293470-EUR',
    country: 'FI',
    accountNumber: {
      value: 'FI6593857450293470',
      _type: 'IBAN',
    },
    currency: 'EUR',
    ownerName: 'Oy Company AB',
    product: 'SHEKKITILI',
    accountType: 'Current',
    availableBalance: '6283.81',
    bookedBalance: '6283.81',
    valueDatedBalance: '6283.81',
    bank: {
      name: 'Nordea',
      bic: 'NDEAFIHH',
      country: 'FI',
    },
    status: 'OPEN',
    creditLimit: '100',
    latestTransactionBookingDate: '2017-11-26',
    _links: [
      {
        rel: 'transactions',
        href: '/v2/accounts/FI6593857450293470-EUR/transactions',
      },
    ],
  };
  // eslint-disable-next-line no-unused-vars
  return account;
};
