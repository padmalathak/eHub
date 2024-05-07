const express = require("express");
const router = express.Router();
const appController = require("../controller/appController.js");
const {
  tokenVerify,
  UserOnly,
  adminOnly,
} = require("../middlewares/auth.middleware.js");

router.route("/").get(tokenVerify, UserOnly, appController.getApps);

router.route("/list").get(tokenVerify, adminOnly, appController.getAppsList);

router
  .route("/users")
  .get(tokenVerify, adminOnly, appController.getAppUsers)
  .post(tokenVerify, adminOnly, appController.postAppUsers);

module.exports = router;
