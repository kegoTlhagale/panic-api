module.exports = app => {
    const responders = require("../controllers/responder.controller.js");
    var router = require("express").Router();

    router.post("/register", responders.create);                            // Create a new Responder
    router.post("/login", responders.findByEmail);                         // Retrieve a single Responder with email

    app.use('/api/responder', router);
};