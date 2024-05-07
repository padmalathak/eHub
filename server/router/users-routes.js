const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { tokenVerify, adminOnly } = require("../middlewares/auth.middleware");

router
  .route("/random")
  .get(userController.getRandomUsers)
  .post(userController.getOktaRandomUsers);

router
  .route("/")
  .get(tokenVerify, adminOnly, userController.getUsers)
  .post(userController.addNewUser);
router.route("/roles").get(userController.getRoleCount);
router.route("/roledetails").get(userController.getRoleDetails);
router
  .route("/:id")
  .get(userController.getUserById)
  .put(userController.putUserById)
  .delete(userController.deleteUserById);

module.exports = router;
