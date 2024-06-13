const jwt = require("jsonwebtoken");
const User = require("../models/User");

let blacklistTokens = {};

async function tokenChecker(request, response, next) {
  try {
    request.authedUser = null;

    const tokenReceived = request.headers.authorization;

    if (blacklistTokens[tokenReceived]) {
      response.status(401).send();
      return;
    }

    const decodedToken = await jwt.verify(
      tokenReceived,
      process.env.JWT_SECRET
    );

    if (decodedToken) {
      const user = await User.findOne({ _id: decodedToken._id })
        .select("-password")
        .select("-projectsIds");

      if (user) {
        request.authedUser = { ...user._doc };
        next();
      }
    } else {
      response.status(401).send();
      return;
    }
  } catch (err) {
    response.status(401).send();
  }
}

function addTokenToBlackList(token, user) {
  blacklistTokens[token] = { ...user };
}

function removeTokensFromBlackList() {
  blacklistTokens = {};
}

setInterval(removeTokensFromBlackList, 60 * 60 * 1000);

module.exports = { tokenChecker, addTokenToBlackList, blacklistTokens };
