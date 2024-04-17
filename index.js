const express = require("express");
const courseRouter = require("./routes/courses");
const userRouter = require("./routes/userRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();
const mongoose = require("mongoose");
const noteRouter = require("./routes/noteRoutes");
const cors = require("cors");

const app = express();

//Middleware:-
//using body-parser to parse the data into json when user submit any form or send data from client side
app.use(bodyParser.json());
app.use(cors());
// parent route for all the other api routes in courses route
app.use("/api", courseRouter);
app.use("/users", userRouter);
app.use("/note", noteRouter);

// ==========================================

// connecting to DB and then starting the server
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("DB Connected and Server is running...");
    });
  })
  .catch((err) => {
    console.log(err);
  });
