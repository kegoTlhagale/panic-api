//console.log('May Node be with you')
const express = require("express");
const cors = require("cors");
const app = express();


app.use(express.json()); // parse requests of content-type - application/json
app.use(express.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded
// var corsOptions = {
//   //origin: "http://localhkost:8081",
//   origin: "http://192.168.8.125:8081"
// };


const corsOptions = {
  origin: "http://localhost:8081",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

require("./app/routes/panic.routes.js")(app); // Routes to the CRUD
require("./app/routes/user.routes.js")(app); // Routes to the CRUD
require("./app/routes/responder.routes.js")(app); // Routes to the CRUD

// simple/default route
app.get("/", (req, res) => {
  res.json({ message: "Panic API" });
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
