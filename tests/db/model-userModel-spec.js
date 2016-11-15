/* eslint-disable no-unused-expressions */

const mocha = require('mocha');
const expect = require('chai').expect;
const User = require('../../db/models/userModel.js');

const describe = mocha.describe;
const it = mocha.it;
const beforeEach = mocha.beforeEach;
const after = mocha.after;

describe('User Model', () => {
  const newUser = {
    username: 'neverused',
    password: 'watever',
    salt: 'notasalt',
  };
  const newUser2 = {
    username: 'neverused',
    password: 'watever2',
    salt: 'notasalt',
  };
  const newUser3 = {
    username: 'hahahaha',
    password: 'watever3',
    salt: 'notasalt',
  };
  const newUser4 = {
    username: 'plsdontuse',
    password: 'watever4',
    salt: 'notasalt',
  };

  beforeEach((done) => {
    User.remove({ username: 'neverused' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'hahahaha' }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ username: 'plsdontuse' }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
    });
  });

  after((done) => {
    User.remove({ username: 'neverused' }, (err) => {
      if (err) { console.error(err); }
      User.remove({ username: 'hahahaha' }, (err2) => {
        if (err2) { console.error(err2); }
        User.remove({ username: 'plsdontuse' }, (err3) => {
          if (err3) { console.error(err3); }
          done();
        });
      });
    });
  });

  describe('User creation: ', () => {
    it('Does not add invalid users to database', (done) => {
      User.create({ username: '123' }, (err, user) => {
        expect(err).to.exist;
        expect(user).to.equal(null);
        done();
      });
    });

    it('Adds valid users to database and returns user', (done) => {
      User.create(newUser, (err, user) => {
        expect(err).to.not.exist;
        expect(user.username).to.equal('neverused');
        done();
      });
    });
  });

  describe('User Update: ', () => {
    beforeEach((done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        done();
      });
    });

    it('Does not add or remove users from database', (done) => {
      User.find({ username: 'neverused' }, (err, users) => {
        expect(err).to.not.exist;
        User.update(newUser, newUser2, (err2) => {
          expect(err2).to.not.exist;
          User.find({ username: 'neverused' }, (err3, users2) => {
            expect(err3).to.not.exist;
            expect(users.length).to.equal(users2.length);
            done();
          });
        });
      });
    });

    it('Updates existing users from database', (done) => {
      User.update(newUser, newUser2, (err2, users) => {
        expect(err2).to.not.exist;
        expect(users[0].password).to.equal('watever2');
        done();
      });
    });
  });

  describe('User find: ', () => {
    beforeEach((done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.create(newUser3, (err2) => {
          expect(err2).to.not.exist;
          User.create(newUser4, (err3) => {
            expect(err3).to.not.exist;
            done();
          });
        });
      });
    });
    it('Find all users if passed empty object', (done) => {
      User.find({}, (err4, users) => {
        expect(err4).to.not.exist;
        expect(users.length).to.be.above(2);
        done();
      });
    });

    it('Uses object as search query when passed object with properties', (done) => {
      User.find({ username: 'hahahaha' }, (err4, users) => {
        expect(err4).to.not.exist;
        expect(users.length).to.equal(1);
        expect(users[0].password).to.equal('watever3');
        done();
      });
    });

    it('findOne returns first found item for query', (done) => {
      User.find({}, (err, users) => {
        expect(err).to.not.exist;
        User.findOne({}, (err2, user) => {
          expect(err).to.not.exist;
          expect(user).to.deep.equal(users[0]);
          done();
        });
      });
    });

    it('findById takes id as parameter and returns user if found', (done) => {
      User.findOne({}, (err, user) => {
        expect(err).to.not.exist;
        User.findById(user.id, (err2, user2) => {
          expect(err2).to.not.exist;
          expect(user).to.deep.equal(user2);
          done();
        });
      });
    });
  });

  describe('User remove: ', () => {
    beforeEach((done) => {
      User.create(newUser, (err) => {
        expect(err).to.not.exist;
        User.create(newUser3, (err2) => {
          expect(err2).to.not.exist;
          done();
        });
      });
    });
    it('Removes user based on search query when passed object with properties', (done) => {
      User.remove({ username: 'neverused' }, (err3) => {
        expect(err3).to.not.exist;
        User.find({ username: 'neverused' }, (err4, users) => {
          expect(err4).to.not.exist;
          expect(users.length).to.equal(0);
          done();
        });
      });
    });

    it('Remove returns the deleted rows', (done) => {
      User.remove({ username: 'neverused' }, (err, users) => {
        expect(err).to.not.exist;
        expect(users.length).to.equal(1);
        expect(users[0].username).to.equal('neverused');
        done();
      });
    });
  });
});
