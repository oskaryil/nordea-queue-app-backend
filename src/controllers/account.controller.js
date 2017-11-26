import * as accountService from '../services/account-info';
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
    const accounts = await accountService.fetchAccounts(
      req.user.nordea.accessToken,
    ); // Fetches accounts with account-info service
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

const getSingleAccount = async (req, res, next) => {
  const { accountId } = req.params || req.header; // extract accountId
  const accountsArray = req.user.accounts; // get the accounts array to later iterate
  // See if the account._id provided is actually real
  let accountExist; // later assigned a boolean value
  for (const accountObj of accountsArray) {
    if (accountObj._id === accountId) {
      accountExist = true; // accountExist is now true because it does exist
    }
  }
  if (!accountExist) {
    return res.status(400).send({ err: 'accountId does not exist' }); // if accountExist is false then this errror message gets passed
  }

  try {
    const account = await accountService.fetchSingleAccount(
      accountId,
      req.user.nordea.accessToken,
    );
    return res.status(200).send(account); // send the single account
  } catch (e) {
    next(e);
  }
};

export { getAccounts, getSingleAccount };
