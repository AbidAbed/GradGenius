const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  documentationFileName: { type: String },
  deadline: { type: mongoose.Schema.Types.Number, required: true },
  teamSize: { type: mongoose.Schema.Types.Number, required: true },
  isWithDocumentation: { type: mongoose.Schema.Types.Boolean, required: true },

  progress: { type: mongoose.Schema.Types.Number, default: 0 },
  status: { type: String, default: "Pending" },

  ownerUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  
});

// ProjectSchema.virtual("owner", {
//   foreignField: "_id",
//   localField: "ownerUserId",
//   justOne: true,
//   ref: "User",
// });

const Project = mongoose.model("Project", ProjectSchema);

module.exports = Project;
