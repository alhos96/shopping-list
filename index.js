const express = require("express");
const mongoose = require("mongoose");

const config = require("./config");
const userRoutes = require("./routes/user.routes");

const app = express();

app.use("/user", userRoutes);

mongoose
  .connect(config.mongo)
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  })
  .catch((err) => console.log(err));
