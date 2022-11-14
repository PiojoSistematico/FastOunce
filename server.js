const express = require("express");
const app = express();
const colors = require("colors");
const mongoose = require("mongoose");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const methodOverride = require("method-override");
const flash = require("express-flash");
const logger = require("morgan");
const port = process.env.PORT || 2121;

//Use .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport);

//Connect To Database
connectDB();

//Using EJS for views
app.set("view engine", "ejs");

//Static Folder
app.use(express.static("public"));

//Body Parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logging
app.use(logger("dev"));

//Use forms for put / delete
app.use(methodOverride("_method"));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: "klasdfjiem345mc",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_STRING,
      /* mongooseConnection: mongoose.connection, */
    }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

//Setup Routes For Which The Server Is Listening
app.use("/", require("./routes/homeRoutes"));
app.use("/post", require("./routes/postRoutes"));
//app.use("/comment", "./routes/commentRoutes");

app.use(errorHandler);

app.listen(port, () => console.log(`Running on port ${port}`));
