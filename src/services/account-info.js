// import axios from 'axios';

/*
  TODO:
    use nordea-api.js service to create api calls
 */
export const fetchAccounts = () => {
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
      availableBalance: '6747.94',
      bookedBalance: '6747.94',
      valueDatedBalance: '6747.94',
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
  return new Promise((resolve, reject) => {
    resolve(accounts);
  });
};

// eslint-disable-next-line no-unused-vars
export const fetchSingleAccount = accountId => {
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
    availableBalance: '6701.31',
    bookedBalance: '6701.31',
    valueDatedBalance: '6701.31',
    bank: {
      name: 'Nordea',
      bic: 'NDEAFIHH',
      country: 'FI',
    },
    status: 'OPEN',
    creditLimit: '100',
    latestTransactionBookingDate: '2017-11-25',
    _links: [
      {
        rel: 'transactions',
        href: '/v2/accounts/FI6593857450293470-EUR/transactions',
      },
    ],
  };
  // eslint-disable-next-line no-unused-vars
  return new Promise((resolve, reject) => {
    resolve(account);
  });
};
