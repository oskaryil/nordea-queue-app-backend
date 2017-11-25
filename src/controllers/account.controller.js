import * as account from '../services/account-info';
import User from '../models/user.model';
/*
  TODO:
    Create getAccount, getAccountById.... using account-info.js service
 */

/*
  While getting the accounts array it also updates the
  accounts array in the user document.
 */
const getAccounts = async (req, res, next) => {
  try {
    const accounts = await account.fetchAccounts(); // Fetches accounts with account-info service
    const userId = req.user._id; // Takes out user id

    // Finds user and updates accounts information
    const user = await User.findByIdAndUpdate(userId, {
      $set: { accounts },
    });
    if (!user) {
      return res.status(400).send({ err: 'user._id does not exist' }); // If no user is found this is the error
    }
    return res.status(200).send(accounts); // If user is found return 200 OK and the accounts array
  } catch (e) {
    next(e);
  }
};

export { getAccounts };
