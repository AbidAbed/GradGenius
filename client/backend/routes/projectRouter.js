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

const projectRouter = Router();

projectRouter.post("/project", postProjectValidator(), postProject);
projectRouter.get("/project", getProjectValidator(), getProject);
projectRouter.get("/projects", getProjectsValidator(), getProjects);

module.exports = projectRouter;
