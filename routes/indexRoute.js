const express = require("express");

const user_controller = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get("/", function(req, res) {
    console.log(req.user);
    res.send("Landing Page");
});

router.get("/home", auth, function(req, res) {
    res.send("Home Page");
});

router.post("/login", user_controller.login);

module.exports = router;