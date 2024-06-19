const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/mainRouter");
const dotenv = require("dotenv").config({ path: "./.env" });

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(mainRouter);
app.use(express.static(process.env.PUBLIC_FOLDER_PATH));

mongoose
  .connect(process.env.DB_URL)
  .then((rslt) => {
    console.log("Connected to db");
    app.listen(process.env.PORT, () => {
      console.log("Running on port ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("FAILED Connected to db", err);
  });
