const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { addTokenToBlackList } = require("../Middlewares/TokenChecker");
const GenerateSecret = require("../utils/GenerateSecret");
const QRCode = require("qrcode");
const OTPAuth = require("otpauth");

async function postUserSignup(request, response) {
  try {
    const { password, ...restUserObject } = request.body;

    const base32_secret = GenerateSecret();

    // let totp = new OTPAuth.TOTP({
    //   issuer: "GradGenius",
    //   label: "GradGenius",
    //   algorithm: "SHA1",
    //   digits: 6,
    //   secret: base32_secret,
    // });

    // let otpauth_url = totp.toString();

    // const secretKey = await QRCode.toDataURL(otpauth_url);
    //   if (err) {
    //     return res.status(500).json({
    //       status: "fail",
    //       message: "Error while generating QR Code",
    //     });
    //   }
    //   res.json({
    //     status: "success",
    //     data: {
    //       qrCodeUrl: qrUrl,
    //       secret: base32_secret,
    //     },
    //   });
    // });

    // console.log(base32_secret);

    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const createdUser = await User.create({
      ...restUserObject,
      password: hashedPassword,
      secret2FactorAuth: base32_secret,
    });

    const savedUser = await User.findById(createdUser._doc._id)
      .select("-password")
      .select("-projectsIds");

    response.status(200).send({ ...savedUser._doc });
  } catch (err) {
    if (err.errorResponse.errmsg.includes("duplicate key error"))
      response.status(404).send();
    else response.status(500).send();
  }
}

async function postUserSignin(request, response) {
  try {
    const loggedInUser = await User.findOne({
      email: request.body.email,
    });

    if (loggedInUser === null) {
      response.status(404).send();
      return;
    }

    let totp = new OTPAuth.TOTP({
      issuer: "YourSite.com",
      label: "YourSite",
      algorithm: "SHA1",
      digits: 6,
      secret: loggedInUser.secret2FactorAuth,
    });

    let delta = totp.validate({ token: request.body.otp_code });

    if (delta === null) {
      response.status(401).send();
      return;
    }

    const isPasswordCorrect = await bcrypt.compare(
      request.body.password,
      loggedInUser._doc.password
    );

    if (isPasswordCorrect) {
      const token = await jwt.sign(
        { _id: loggedInUser._doc._id },
        process.env.JWT_SECRET,
        { expiresIn: 60 * 60 }
      );

      const userData = await User.findOne({
        email: request.body.email,
      })
        .select("-password")
        .select("-projectsIds");

      response.set("authorization", token);
      response.status(200).send({ ...userData._doc });
    } else {
      response.status(401).send();
    }
  } catch (err) {
    console.log(err);
    response.status(500).send();
  }
}

async function putUserProfile(request, response) {
  try {
    const updatedUserInfo = { ...request.body };

    response.set("authorization", request.headers.authorization);

    if (Object.keys(request.body) === 0) {
      response.status(400).send();
      return;
    }

    if (request.body.password) {
      const hashedPassword = await bcrypt.hash(
        request.body.password,
        Number(process.env.SALT_ROUNDS)
      );

      updatedUserInfo.password = hashedPassword;

      addTokenToBlackList(request.headers.authorization, {
        ...request.authedUser,
        ...updatedUserInfo,
      });

      response.set("authorization", "null");
    }

    const updatedUser = await User.findByIdAndUpdate(
      request.authedUser._id,
      {
        ...updatedUserInfo,
      },
      { returnDocument: "after" }
    )
      .select("-password")
      .select("-projectsIds");

    response.status(200).send({ ...updatedUser._doc });
  } catch (err) {
    response.status(500).send();
  }
}

async function postLogoutUser(request, response) {
  try {
    response.set("authorization", request.headers.authorization);
    addTokenToBlackList(request.headers.authorization, request.authedUser);
    response.status(200).send();
  } catch (err) {
    response.status(500).send();
  }
}

async function postAuthUser(request, response) {
  try {
    response.status(200).send({ ...request.authedUser });
  } catch (err) {
    response.status(500).send();
  }
}

module.exports = {
  postUserSignup,
  postUserSignin,
  putUserProfile,
  postLogoutUser,
  postAuthUser,
};
