import { expect } from 'chai';

import server from '../../../__mocks__/utils/server.mock';
import User from '../../../src/models/user.model';
import UserFactory from '../../../__mocks__/factories/user.factory';
import { accounts } from './exampleData.js';

const ENDPOINT = '/api/account';

let testUser;

/*
  TODO
   remove this test when it stops working
 */

describe(`GET ${ENDPOINT}`, () => {
  before(async () => {
    await User.remove();
    testUser = await User.create(UserFactory.generate());
  });

  describe('Get array with status 200', () => {
    it('should get array', done => {
      server
        .get(ENDPOINT)
        .set('Authorization', `JWT ${testUser.createToken()}`)
        .end((err, res) => {
          const { status, body } = res;
          expect(status).to.equal(200);
          expect(body[0]._id).to.equal(accounts[0]._id);
          done();
        });
    });
  });
});
