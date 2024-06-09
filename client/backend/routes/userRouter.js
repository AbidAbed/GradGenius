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
} = require("../controllers/UserController");

const userRouter = Router();

userRouter.post("/user/singup", postUserSignupValidator(), postUserSignup);
userRouter.post(
  "/user/singin",
  postUserSigninValidator(),
  postUserSigninValidator
);
userRouter.put("/user/profile", putUserProfileValidator(), putUserProfile);
userRouter.post("/user/auth", postAuthUserValidator(), postAuthUser);
userRouter.post("/user/logout", postLogoutUserValidator(), postLogoutUser);

module.exports = userRouter;
