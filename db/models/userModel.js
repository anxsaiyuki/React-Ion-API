const db = require('../../server/config/connection');

module.exports.get = (params, cb) => {
  const keys = Object.keys(params);
  const vals = Object.values(params);
  if (keys.length > 0) {
    let queryString = 'select * from users where ';
    for (let i = 0; i < keys.length; i++) {
      queryString += `${keys[i]}=?`;
    }
    db.query(queryString, vals, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'select * from users';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};

module.exports.create = (userProps, cb) => {
  const params = [userProps.id];
  const queryString = `insert into users(id)
                       value (?)`;
  db.query(queryString, params, (err, results) => {
    if (cb) { cb(err, results); }
  });
};

// module.exports.update = (userProps, cb) => {
//   const params = [userProps.newId, userProps.id];
//   const queryString = `update users set id=?
//                        where id=?`;
//   db.query(queryString, params, (err, results) => {
//     if (cb) { cb(err, results); }
//   });
// };

module.exports.remove = (params, cb) => {
  const keys = Object.keys(params);
  const vals = Object.values(params);
  if (keys.length > 0) {
    let queryString = 'delete from users where ';
    for (let i = 0; i < keys.length; i++) {
      queryString += `${keys[i]}=?`;
    }
    db.query(queryString, vals, (err, results) => {
      if (cb) { cb(err, results); }
    });
  } else {
    const queryString = 'delete from users';
    db.query(queryString, (err, results) => {
      if (cb) { cb(err, results); }
    });
  }
};
