/**
 * options for the Swagger UI
 */

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "User IMS",
			version: "1.0.0",
			description:
				"User IMS a RESTful API developed for managing user information such as name, email, phone that utilizes Node.js platform.",
			license: {
				name: "MIT",
				url: "https://spdx.org/licenses/MIT.html",
			},
			contact: {
				name: "R",
				url: "https://rajeevman.com.np",
				email: "r@rajeevman.com.np",
			},
		},
		servers: [],
	},
	apis: ["./routes/*.js"],
};

module.exports = options;
