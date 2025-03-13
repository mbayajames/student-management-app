const express = require("express"); //! to import express
const rateLimiter = require("express-rate-limit") //! to import rate limiter
require("dotenv").config(); //! to import dotenv
require("helmet");

require("./Helpers/init_mongodb"); //! to import init_mongodb from Helpers folder
const app = express(); //! to use express

const limiter = rateLimiter({
    max: 3, //! max number of requests
    windowMs: 60 * 60 * 1000, //! time window in milliseconds
    message: "Too many requests from this IP, please try again later"
})

app.use("/api", limiter); //! to use rate limiter on /api route

//! Importing Routes:
const Student_Routes = require("./routes/StudentsRoutes");
const Student_Auth_Routes = require("./Routes/studentAuthRoutes");

//! to use body-parser
app.use(express.json());


app.use("/api/students", Student_Routes);
app.use("/api/studentAuth", Student_Auth_Routes);

app.use(Student_Routes); //! Using the Imported Routes:
app.use(Lecturer_routes);
app.use(Student_Auth_Routes);

// app.use('students')

//! handling 404 errors
app.use(async (request, response, next) => {
    next(createError.NotFound())
})

app.use((error, request, response, next) => {
    response.status
})

//! Starting the Server:
app.listen(process.env.port || 4000, function () {
    console.log("Now listening for requests on: http://localhost:4000"); //! to print the server is running on port 4000
});