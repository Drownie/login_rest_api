const express = require("express");

const controller = require('../controllers/userController');
const auth = require('../middleware/auth');

const router = express.Router();

router.get("/fetch", auth, controller.fetch_users);

router.post("/create", controller.create_user);

router.get("/user/:id", auth, controller.fetch_user);

router.put("/user/:id", auth, controller.update_user);

router.delete("/user/:id", auth, controller.delete_user);

module.exports = router;