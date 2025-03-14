const express = require("express");
const authcontroller = require("../controllers/authcontroller");

// Register Route

router.post("/register", authcontroller.register);

router.get("/login", authcontroller.login);
module.exports = router;