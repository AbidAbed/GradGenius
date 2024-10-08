const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  telegram: { type: String, required: true },
  password: { type: String, required: true },
  secret2FactorAuth: { type: String, required: true },
  projectsIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
