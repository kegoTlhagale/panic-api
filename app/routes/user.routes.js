module.exports = app => {
    const users = require("../controllers/user.controller.js");
    var router = require("express").Router();

    router.post("/register", users.create);                            // Create a new Panic
    router.post("/login", users.findByEmail);                         // Retrieve a single User with id

    app.use('/api/user', router);
};