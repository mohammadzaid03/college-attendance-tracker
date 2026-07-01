const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", testRoutes);

module.exports = app;