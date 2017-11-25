/**
 * User controller
 */

import Joi from 'joi';
import HTTPStatus from 'http-status';

import { filteredBody } from '../utils/filteredBody';
import constants from '../config/constants';
import User from '../models/user.model';
import { sendSMS } from '../services/sms.service';

export const validation = {
  create: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .required(),
      username: Joi.string()
        .min(3)
        .max(20)
        .required(),
    },
  },
};

/**
 * @api {post} /users/signup Create a user
 * @apiDescription Create a user
 * @apiName createUser
 * @apiGroup User
 *
 * @apiParam (Body) {String} email User email.
 * @apiParam (Body) {String} password User password.
 * @apiParam (Body) {String} username User username.
 *
 * @apiSuccess {Number} status Status of the Request.
 * @apiSuccess {String} _id User _id.
 * @apiSuccess {String} token Authentication token.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 *  _id: '123',
 *  token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1OTBhMWI3ODAzMDI3N2NiNjQxM2JhZGUiLCJpYXQiOjE0OTM4MzQ2MTZ9.RSlMF6RRwAALZQRdfKrOZWnuHBk-mQNnRcCLJsc8zio',
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 *  {
 *    email: 'email is required'
 *  }
 */
export async function create(req, res, next) {
  const body = filteredBody(req.body, constants.WHITELIST.users.create);
  try {
    const user = await User.create(body);
    return res.status(HTTPStatus.CREATED).json(user.toAuthJSON());
  } catch (e) {
    e.status = HTTPStatus.BAD_REQUEST;
    return next(e);
  }
}

export const sendVerificationCode = async (req, res, next) => {
  try {
    const data = filteredBody(req.body, constants.WHITELIST.users.create);
    let { phoneNumber } = data;
    if (phoneNumber.length === 13 && phoneNumber.substring(0, 3) === '+46') {
      phoneNumber = `${phoneNumber.substring(0, 3)}${phoneNumber.substring(
        4,
        phoneNumber.length,
      )}`;
    }
    const user = await User.findOne({ phoneNumber });
    if (user)
      return res
        .status(400)
        .send({ success: false, error: 'Phone number exists' });
    const verificationCode = Math.floor(Math.random() * 90000) + 10000;
    // eslint-disable-next-line no-param-reassign
    req.session.verificationCode = verificationCode.toString();
    await sendSMS(
      'Nordea Queue',
      phoneNumber,
      `Use ${verificationCode} to verify your account!`,
    );
  } catch (err) {
    next(err);
  }
};

export const createUserFromVerificationCode = async (req, res, next) => {
  try {
    const { verificationCode } = req.params || req.query || req.body;
    if (verificationCode === req.session.verificationCode) {
      // delete req.session.verificationCode;
      const user = await User.create(req.session.user);
      return res.status(200).send({
        success: true,
        message: 'Code verified and User created',
        user: user.toAuthJSON(),
      });
    }
    return res
      .status(400)
      .send({ succes: false, message: 'Code verification failed' });
  } catch (err) {
    next(err);
  }
};
