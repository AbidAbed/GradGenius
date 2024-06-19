const Project = require("../models/Project");
const User = require("../models/User");

async function postProject(request, response) {
  try {
    // console.log(5000);
    const { name, deadline, teamSize, isWithDocumentation } = request.body;
    const createdProject = await Project.create({
      name,
      deadline,
      teamSize,
      isWithDocumentation,
      documentationFileName: isWithDocumentation ? request.file.filename : null,
      ownerUserId: request.authedUser._id,
    });

    const updatedUser = await User.findByIdAndUpdate(
      request.authedUser._id,
      {
        $push: { projectsIds: createdProject._doc._id },
      },
      { returnDocument: "after" }
    ).select("-password");

    response.status(200).send({ ...createdProject._doc });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
}

async function getProject(request, response) {
  try {
    const user = await User.findById(request.authedUser._id);

    const isProjectBelongsToUser = user.projectsIds.find(
      (id) =>  id.toString() === request.query.projectId
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
    console.log(err);
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
