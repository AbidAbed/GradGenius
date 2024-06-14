const Project = require("../models/Project");
const User = require("../models/User");

async function postProject(request, response) {
  try {
  } catch (err) {}
}

async function getProject(request, response) {
  try {
    const user = await User.findById(request.authedUser._id);

    const isProjectBelongsToUser = user.projectsIds.find(
      (id) => id === request.query.projectId
    );

    if (!isProjectBelongsToUser) {
      response.status(404).send();
      return;
    }

    const project = await Project.findOne({ _id: request.query.projectId });

    if (!project) {
      response.status(404).send();
      return;
    }

    response.status(200).send({ ...project._doc });
  } catch (err) {
    response.status(500).send();
  }
}

async function getProjects(request, response) {
  try {
    const user = await User.findById(request.authedUser._id);

    const projects = [];

    for (
      let pageIndex =
        Number(process.env.PROJECTS_PAGE_SIZE) * (request.query.page - 1) || 0;
      pageIndex < Number(process.env.PROJECTS_PAGE_SIZE) * request.query.page;
      pageIndex += 1
    ) {
      if (user.projectsIds[pageIndex]) {
        const project = await Project.findOne({
          _id: user.projectsIds[pageIndex],
        });
        projects.push({ ...project._doc });
      } else {
        break;
      }
    }

    response.status(200).send([...projects]);
  } catch (err) {
    console.log(err);
    response.status(500).send();
  }
}

module.exports = { postProject, getProject, getProjects };
