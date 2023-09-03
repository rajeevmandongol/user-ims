const express = require("express");
const app = express();
const bodyParser = require("body-parser");

/**
 * Import the userRoutes to be used for the /users API Endpoints
 */
const userRoutes = require("./routes/userRoutes");

/**
 * Import the custom errorHandler that can handle various types of expected errors
 */
const { errorHandler } = require("./helper/userHelper");

/**
 * These are the configurations for integrating the Swagger UI to the project
 */
const options = require("./options");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// use the imported options object for the swaggerJsdoc method
const specs = swaggerJsdoc(options);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Parse incoming requests with JSON bodies


// set /users as the API Endpoints for the project
app.use("/users", userRoutes);

// setup the Swagger UI with /api-docs route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));


app.use((req, res, next) => {
	const error = new Error("Not Found");
	error.status = 404;
	next(error);
});

// use the custome error handler from the helper methods
app.use(errorHandler);

module.exports = app;
