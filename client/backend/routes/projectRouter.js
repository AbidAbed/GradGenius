const { Router } = require("express");
const {
  postProject,
  getProject,
  getProjects,
} = require("../controllers/ProjectController");
const {
  postProjectValidator,
  getProjectValidator,
  getProjectsValidator,
  postProjectValidatorUpload,
} = require("../validators/projectValidator");
const { tokenChecker } = require("../Middlewares/TokenChecker");
const { documentaionFile } = require("../middlewares/DocumentationFileUpload");
const projectRouter = Router();

projectRouter.post(
  "/project",
  tokenChecker,
  documentaionFile,
  postProjectValidator,
  postProjectValidatorUpload,
  postProject
);

projectRouter.get("/project", tokenChecker, getProjectValidator(), getProject);

projectRouter.get(
  "/projects",
  tokenChecker,
  getProjectsValidator(),
  getProjects
);

module.exports = projectRouter;