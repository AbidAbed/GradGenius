const multer = require("multer");
const { formDataBodyParser } = require("../validators/projectValidator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("Inside destination function");
    // console.log(12);
    cb(null, process.env.PUBLIC_FOLDER_PATH);
  },
  filename: function (req, file, cb) {
    // console.log("Inside filename function");
    // console.log(13);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

function documentaionFile(req, res, next) {
  // console.log("Middleware start");
  // console.log(req.headers);

  multer({
    storage: storage,
    limits: {
      fieldNameSize: Number(process.env.MAX_FILE_SIZE),
      fileSize: Number(process.env.MAX_FILE_SIZE),
    },
  }).single("documentationFile")(req, res, (err) => {
    if (err) {
      // console.log("Error in multer:", err);
      res.status(400).send();
      return;
    }
    // console.log("After multer");
    req.body = { ...req.body, ...formDataBodyParser({ ...req.body }) };
    // console.log(req.body, req.file, 156);
    next();
  });

  // console.log(Number(process.env.MAX_FILE_SIZE));
}

module.exports = {
  documentaionFile,
};
