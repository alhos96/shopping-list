const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const config = require("./config");
const userRoutes = require("./routes/user.routes");
const listRoutes = require("./routes/list.routes");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/list", listRoutes);

mongoose
  .connect(config.mongo)
  .then(() => {
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
  })
  .catch((err) => console.log(err));
