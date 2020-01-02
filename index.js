const express = require("express");
const path = require("path");
const morgan = require("morgan");
// const cors = require('cors');
const app = express();

const { index } = require("./controllers/index_controller");
require("dotenv").config();
// require('./config/dbconnection');

// app.use(cors());
app.use(morgan("dev"));

// Routes
app.get("/", index);

app.listen(process.env.PORT, err => {
  if (err) {
    console.log("Error in running server");
    return;
  }
  console.log(
    `Server is up and running on http://localhost:${process.env.PORT}`
  );
});
