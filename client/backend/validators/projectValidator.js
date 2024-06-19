const { Joi, Segments, celebrate, errors } = require("celebrate");
const fs = require("fs");

const stringValidationChain = Joi.string().not().empty();

function postProjectValidator(req, res, next) {
  // console.log(error);
  let currentDate = new Date();

  currentDate.setMinutes(
    currentDate.getMinutes() - Number(process.env.MIN_START_TIME_FOR_PROJECT)
  );

  currentDate.setMonth(currentDate.getMonth() + 1);

  const minDate = new Date(currentDate.getTime());

  // console.log(
  //   minDate.toISOString(),
  //   468465465,
  //   minDate.getTime(),
  //   minDate.toISOString(),
  //   req.body.deadline
  // );
  // console.log(req.body);
  return celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: stringValidationChain.required(),
      })
      .unknown(true),
    [Segments.BODY]: Joi.object().keys({
      name: stringValidationChain.required().min(4),
      deadline: Joi.number().required().min(minDate.getTime()),
      teamSize: Joi.number().required(),
      isWithDocumentation: Joi.boolean().required(),
      documentationFile: Joi.object().optional(),
    }),
  })(req, res, next);
}

function formDataBodyParser(body) {
  return {
    teamSize: Number(body.teamSize),
    deadline: Number(body.deadline),
    isWithDocumentation: body.isWithDocumentation === "true" ? true : false,
  };
}

async function postProjectValidatorUpload(req, res, next) {
  try {
    // console.log(err);
    let isValidDoc = false;

    const { isWithDocumentation } = req.body;

    // console.log(55, req.body, req.file);
    if (isWithDocumentation && !req.file) {
      res.status(400).send();
      return;
    } else if (!isWithDocumentation && req.file) {
      fs.unlink(req.file.path, (removingFileError) =>
        console.log("Removing File Error", removingFileError)
      );

      res.status(400).send();

      return;
    } else if (!isWithDocumentation && !req.file) next();
    else {
      const { fileTypeFromStream } = await import("file-type");

      const stream = fs.createReadStream(req.file.path);
      const uploadedDocFileType = await fileTypeFromStream(stream);

      // console.log(uploadedDocFileType);
      if (uploadedDocFileType)
        isValidDoc = process.env.SUPPORTED_DOCUMENTS_MIME_TYPES.split(",").find(
          (supportedMimeType) => supportedMimeType === uploadedDocFileType.mime
        );
      else isValidDoc = false;
      stream.close();

      if (!isValidDoc) {
        fs.unlink(req.file.path, (removingFileError) =>
          console.log("Removing File Error", removingFileError)
        );

        res.status(400).send();

        return;
      } else {
        if (uploadedDocFileType.ext === "cfb") uploadedDocFileType.ext = "doc";
        fs.rename(
          req.file.path,
          req.file.path + "." + uploadedDocFileType.ext,

          (removingFileError) =>
            console.log("Renaming File Error", removingFileError)
        );
        req.file.path = req.file.path + "." + uploadedDocFileType.ext;
        req.file.filename = req.file.filename + "." + uploadedDocFileType.ext;
        next();
      }
    }
  } catch (error) {
    // console.log(123);
    res.status(500).send();
    console.log(error);
  }
}

function getProjectValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: stringValidationChain.required(),
      })
      .unknown(true),
    [Segments.QUERY]: Joi.object().keys({
      projectId: stringValidationChain.required(),
    }),
  });
}

function getProjectsValidator() {
  return celebrate({
    [Segments.HEADERS]: Joi.object()
      .keys({
        authorization: stringValidationChain.required(),
      })
      .unknown(true),
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number().required().min(1),
    }),
  });
}

module.exports = {
  postProjectValidator,
  getProjectValidator,
  getProjectsValidator,
  postProjectValidatorUpload,
  formDataBodyParser,
};
