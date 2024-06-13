const { Router } = require("express");
const {
  postUserSignupValidator,
  postUserSigninValidator,
  putUserProfileValidator,
  postAuthUserValidator,
  postLogoutUserValidator,
} = require("../validators/userValidator");
const {
  postUserSignup,
  putUserProfile,
  postAuthUser,
  postLogoutUser,
  postUserSignin,
} = require("../controllers/userController");
const { tokenChecker } = require("../Middlewares/TokenChecker");

const userRouter = Router();

userRouter.post("/user/singup", postUserSignupValidator(), postUserSignup);
userRouter.post("/user/singin", postUserSigninValidator(), postUserSignin);
userRouter.put(
  "/user/profile",
  tokenChecker,
  putUserProfileValidator(),
  putUserProfile
);
userRouter.post(
  "/user/auth",
  tokenChecker,
  postAuthUserValidator(),
  postAuthUser
);
userRouter.post(
  "/user/logout",
  tokenChecker,
  postLogoutUserValidator(),
  postLogoutUser
);

module.exports = userRouter;
