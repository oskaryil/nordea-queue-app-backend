import { expect } from 'chai';

import User from '../../../src/models/user.model';
import server from '../../../__mocks__/utils/server.mock';

const ENDPOINT = '/api/seeds/clear';

describe(`GET ${ENDPOINT}`, () => {
  beforeEach(async () => {
    await User.remove();
  });

  describe('Delete with status 200', () => {
    it('should delete all collections', done => {
      server.get(ENDPOINT).end((err, res) => {
        const { text, status } = res;
        expect(status).to.equal(200);
        expect(text).to.equal('All collections clear');
        done();
      });
    });
  });
});
