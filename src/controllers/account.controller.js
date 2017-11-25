/*
  TODO:
    Create getAccount, getAccountById.... using account-info.js service
 */
const getAccount = (req, res) => {
  res.status(200).send('account');
};

export default {
  getAccount,
};
