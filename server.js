const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv").config();
//const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 2121;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use("/api/patients", require("./routes/patientRoutes"));

//app.use(errorHandler);

app.listen(port, () => console.log(`Running on port ${port}`));
