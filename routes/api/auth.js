const express = require("express");

const authRouter = express.Router();

const ctrlUser = require("../../controllers/users");
const { ctrlWrapper } = require("../../helpers");

const {
  validateBody,
  authenticate,
  uploadCloud,
} = require("../../middlewares");
const schemas = require("../../schemas");

// Registration
authRouter.post(
  "/register",
  validateBody(schemas.registerSchema),
  ctrlWrapper(ctrlUser.register)
);
// LogIn
authRouter.post(
  "/login",
  validateBody(schemas.loginSchema),
  ctrlWrapper(ctrlUser.login)
);
// avatars

authRouter.patch(
  "/avatars",
  authenticate,
  uploadCloud.single("avatar"),
  ctrlWrapper(ctrlUser.updateAvatar)
);
// Get current user

authRouter.get("/current", authenticate, ctrlWrapper(ctrlUser.getCurrent));

// logout
authRouter.post("/logout", authenticate, ctrlWrapper(ctrlUser.logout));

authRouter.post(
  "/subscribe",
  authenticate,
  ctrlWrapper(ctrlUser.emailSubscription)
);

module.exports = authRouter;
