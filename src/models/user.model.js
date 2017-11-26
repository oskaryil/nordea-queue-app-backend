/* eslint-disable import/no-mutable-exports */

import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';

import constants from '../config/constants';

/*
  TODO:
    See how the accessToken should get handeled, local and nordea
    Add required to accessToken in nordea
 */
const UserSchema = new Schema(
  {
    accounts: {
      type: Array,
    },
    nordea: {
      accessToken: {
        type: String,
        minlength: 8,
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number is required'],
      minLength: [9, 'Phone number must be longer.'],
      unique: [true, 'That phone number already exists'],
    },
  },
  { timestamps: true },
);

UserSchema.plugin(uniqueValidator, {
  message: '{VALUE} already taken!',
});

UserSchema.methods = {
  /**
   * Authenticate the user
   *
   * @public
   * @param {String} password - provided by the user
   * @returns {Boolean} isMatch - password match
   */
  /**
   * Generate a jwt token for authentication
   *
   * @public
   * @returns {String} token - JWT token
   */
  createToken() {
    return jwt.sign(
      {
        _id: this._id,
      },
      constants.JWT_SECRET,
    );
  },

  /**
   * Parse the user object in data we wanted to send when is auth
   *
   * @public
   * @returns {Object} User - ready for auth
   */
  toAuthJSON() {
    return {
      _id: this._id,
      token: `JWT ${this.createToken()}`,
    };
  },

  /**
   * Parse the user object in data we wanted to send
   *
   * @public
   * @returns {Object} User - ready for populate
   */
  toJSON() {
    return {
      _id: this._id,
      phoneNumber: this.phoneNumber,
    };
  },
};

let User;

try {
  User = mongoose.model('User');
} catch (e) {
  User = mongoose.model('User', UserSchema);
}

export default User;
