module.exports = app => {
    const panics = require("../controllers/panic.controller.js");
    var router = require("express").Router();

    router.post("/", panics.create);                            // Create a new Panic
    router.get("/", panics.findAll);                            // Retrieve all Panics

    app.use('/api/panics', router);
};