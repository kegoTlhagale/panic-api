const sql = require("./db.js");
// constructor
const Panic = function(panic) {
  this.Latitude = panic.latitude;
  this.Longitude = panic.longitude;
  this.Location = panic.location;
  this.UserID = panic.user;
  this.PhoneNumber = panic.phone
};

Panic.create = (newPanic, result) => {
  sql.query("INSERT INTO Panics SET ?", newPanic, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created panic: ", { id: res.insertId, ...newPanic });
    result(null, { id: res.insertId, ...newPanic });
  });
};

Panic.getAll = (result) => {
  let query = "SELECT * FROM Panics";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("panics: ", res);
    result(null, res);
  });
};

module.exports = Panic;