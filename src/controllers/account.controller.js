import * as account from '../services/account-info';
import User from '../models/user.model';
/*
  TODO:
    Create getAccount, getAccountById.... using account-info.js service
 */
const getAccounts = async (req, res, next) => {
  try {
    const accounts = await account.fetchAccounts();
    const userId = req.user._id;

    User.findByIdAndUpdate(userId);
    res.send(accounts);
  } catch (e) {
    next(e);
  }
};

export { getAccounts };
