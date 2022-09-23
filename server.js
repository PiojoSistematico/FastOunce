const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
//const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const methodOverride = require("method-override");
//const logger = require("morgan");
const port = process.env.PORT || 2121;

//Connect To Database
connectDB();

const app = express();

//Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logging
//app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Passport middleware
//app.use(passport.initialize());
//app.use(passport.session());

//Use flash messages for errors, info, ect...
//app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", "./routes/homeRoutes");
app.use("/post", "./routes/postRoutes");

//app.use(errorHandler);

app.listen(port, () => console.log(`Running on port ${port}`));
