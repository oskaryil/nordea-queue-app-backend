export const accounts = [
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
