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
} = require("../validators/projectValidator");
const { tokenChecker } = require("../Middlewares/TokenChecker");

const projectRouter = Router();

projectRouter.post(
  "/project",
  tokenChecker,
  (req, res) => postProjectValidator(req, res),
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
