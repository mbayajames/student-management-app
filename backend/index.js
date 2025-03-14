const express = require("express");
const studentsroutes = require("./routes/studentsRoute");
const lecturersroutes = require("./routes/lecturersRoute");
const authroutes = require("./routes/authRoute");
const createError = require("http-errors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./helpers/init_mongodb");

app.use(express.json());
app.use(helmet());


const allowedOrigins = ["http://localhost:3000"];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

const limiter = rateLimit({
  max: 100,
  windowMs: 10 * 1000,
  message: "Too many requests from this IP, please try again later",
});
app.use("/api", limiter); // Apply to all routes

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/students", studentsroutes);
app.use("/lecturers", lecturersroutes);
app.use("/api/auth", authroutes);

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

app.listen(process.env.PORT || 4000, () => {
  console.log("Now listening for requests on: http://localhost:4000");
});