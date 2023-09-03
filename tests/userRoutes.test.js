const app = require("../app");
const request = require("supertest");
const db = require("../models/index");
const { User } = require("../models");

/**
 * userId will be filled automatically
 * after a new user is created using the test post request
 *
 * userId will be used to update the records
 * userId will be used to detele the particular user
 */
let userId = null;

/**
 * userData will be passed as a request body for the POST method
 */
const userData = {
	name: "Ram",
	email: "ram@ram.com",
	phone: "9812345678",
};

/**
 * invalidUserData will be passed as a request body for the POST method
 * To check for the ValidationError
 */
const invalidUserData = {
	name: "Ram1",
	email: "ram@",
	phone: "9812",
};

/**
 * duplicateUserData will be passed as a request body for the POST method
 * To check for the unique constraint of the email
 */
const duplicateUserData = userData;

/**
 * updatedUserData will be passed as a request body for the PUT method
 */
const updatedUserData = {
	name: "Hari",
	email: "hari@hari.com",
	phone: "9812345699",
};

// Test Suite encorporating all the API Endpoints
describe("API Endpoints /users", () => {
	it("should create a new user and return status 201 with user data", async () => {
		const response = await request(app).post("/users").send(userData);
		userId = response.body.data.user.id;

		// console.log("USER ID " + userId); // log the user id that will be used by other methods

		// Check if the HTTP status code is 201 which signifies that new resource
		// which signifies that new resource has been created i.e new user has been added to the database
		expect(response.status).toBe(201);
		expect(response.body).toHaveProperty("success", true);
	});

	it("should return an error response when a duplicate email is provided", async () => {
		// Perform an HTTP POST request to the /users endpoint with duplicateUserData
		const response = await request(app)
			.post("/users")
			.send(duplicateUserData);

		// Expecting 400 Conflict for email already exists
		expect(response.status).toBe(409);

		// Check the response body for appropriate properties to have expected values
		expect(response.body).toHaveProperty("success", false);
	});

	it("should return validation errors with status 400 when invalid data is provided", async () => {
		// Perform an HTTP POST request to the /users endpoint with invalid data
		const response = await request(app)
			.post("/users")
			.send(invalidUserData);

		// Expecting 400 for validation error
		expect(response.status).toBe(400);

		// Check the response body for appropriate properties to have expected values
		expect(response.body).toHaveProperty("success", false);
		expect(response.body).toHaveProperty("message", "ValidationError");
	});

	it("should retrieve a list of users if they exist", async () => {
		// Perform an HTTP GET request to the /users endpoint
		const response = await request(app).get("/users");

		// Check the response status code to be 200 for success
		expect(response.status).toBe(200);

		// Check if the users Array from response body is actually an Array
		expect(Array.isArray(response.body.data.users)).toBe(true);

		// Check if the users array from response body contains more then 0 users
		expect(response.body.data.users.length).toBeGreaterThan(0);
	});

	it("should return user data with status 200 when a user exists", async () => {
		const response = await request(app).get(`/users/${userId}`);

		// Check the response status code to be 200 for success when the user exists
		expect(response.status).toBe(200);

		// Compare the id from the response body against the userId
		// that was returned by the POST method after creating new user
		expect(response.body.data.user.id).toEqual(userId);
	});

	it("should return a 404 status code when a particular user does not exist", async () => {
		// Perform an HTTP GET request to the /users/:id endpoint with an invalid ID
		const response = await request(app).get("/users/10000"); // Assuming this ID does not exist

		// Check the response status code (expecting 404 when the user does not exist)
		expect(response.status).toBe(404);

		// Check the response body for the success property to be false
		expect(response.body).toHaveProperty("success", false);
	});

	it("should update a particular user and respond with the updated user data", async () => {
		// Perform an HTTP PUT request to update the user have id as userId
		const response = await request(app)
			.put(`/users/${userId}`)
			.send(updatedUserData);

		// Check the response status code 200 for success
		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);
	});

	it("should delete a particular user and respond with success", async () => {
		// Perform an HTTP DELETE request to the /users endpoint along with the userId
		const response = await request(app).delete(`/users/${userId}`);

		// Check the response status code 200 for success
		expect(response.status).toBe(200);

		expect(response.body).toHaveProperty("success", true);

		const deletedUser = await User.findByPk(userId);
		expect(deletedUser).toBeNull(); // deletedUser should not exist and should contain null
	});

	it("should return a 204 status code when there are no users", async () => {
		// Clear all user records from the users table
		// Before sending a request to the /users endpoints

		// Truncate the table using the truncate() method
		await User.truncate();

		// Perform an HTTP GET request to the /users endpoint
		const response = await request(app).get("/users");

		// Expecting 204 (No Content) when there are no users)
		expect(response.status).toBe(204);

		// Checking that the response body is empty
		expect(response.body).toEqual({});
	});

	// Close the sequelize connection after all the testing has been performed
	afterAll(async () => {
		await db.sequelize.close();
	});
});
