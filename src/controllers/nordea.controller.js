import Joi from 'joi';

import constants from '../config/constants';
import { filteredBody } from '../utils/filteredBody';
import { getAccessToken } from '../services/nordea-api';
import User from '../models/user.model';

export const validation = {
  nordeaAuth: {
    body: {
      accessCode: Joi.string().required(),
    },
  },
};

export const nordeaAuth = async (req, res, next) => {
  try {
    const data = filteredBody(req.body, constants.WHITELIST.nordea.auth);
    const accessToken = await getAccessToken(data.accessCode);

    await User.findOneAndUpdate(
      { _id: req.user._id },
      { $set: { nordea: { accessToken } } },
    );

    return res.status(200).json();
  } catch (err) {
    next(err);
  }
};
