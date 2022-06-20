const sql = require("./db.js");
// constructor
const User = function(user) {
  this.Name = user.name;
  this.Email = user.email;
  this.Password = user.password;
  this.PhoneNumber = user.phone_number;
  this.Address = user.address;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO Users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByEmail = (email, result) => {
  sql.query(`SELECT * FROM Users WHERE Email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Panic with the id
    result({ kind: "not_found" }, null);
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT * FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }
    // not found Panic with the id
    result({ kind: "not_found" }, null);
  });
};

User.findByPhoneNumber = (phoneNumber, result) => {
    sql.query(`SELECT * FROM users WHERE phone_number = ${phoneNumber}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      // not found Panic with the id
      result({ kind: "not_found" }, null);
    });
};

// Panic.getAll = (type, result) => {
//   let query = "SELECT * FROM users";
//   if (title) {
//     query += ` WHERE title LIKE '%${type}%'`;
//   }
//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("users: ", res);
//     result(null, res);
//   });
// };

// Panic.getAllUnreconciled = result => {
//   sql.query("SELECT * FROM panics WHERE reconciled=false", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Panic.updateStatusById = (id, panic, result) => {
//   sql.query(
//     "UPDATE panics SET status = ?, WHERE id = ?",
//     [panic.status, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }
//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }
//       console.log("updated panic: ", { id: id, ...panic });
//       result(null, { id: id, ...panic });
//     }
//   );
// };

// Panic.updateReconciledById = (id, panic, result) => {
//     sql.query(
//       "UPDATE panics SET reconciled = ?, WHERE id = ?",
//       [panic.reconciled, id],
//       (err, res) => {
//         if (err) {
//           console.log("error: ", err);
//           result(null, err);
//           return;
//         }
//         if (res.affectedRows == 0) {
//           // not found Tutorial with the id
//           result({ kind: "not_found" }, null);
//           return;
//         }
//         console.log("updated panic: ", { id: id, ...panic });
//         result(null, { id: id, ...panic });
//       }
//     );
//   };

// Panic.remove = (id, result) => {
//   sql.query("DELETE FROM panics WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }
//     console.log("deleted panic with id: ", id);
//     result(null, res);
//   });
// };

// Panic.removeAll = result => {
//   sql.query("DELETE FROM panics", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }
//     console.log(`deleted ${res.affectedRows} panics`);
//     result(null, res);
//   });
// };

module.exports = User;