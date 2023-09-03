/**
 * Import Sequelize to check for SQL based eroors
 * such as validation errors, unique constraints, etc.
 */
const { Sequelize } = require("sequelize");

const handleEmptyFields = (req, res) => {
	const { name, email, phone } = req.body;
	if (!name || !email || !phone) {
		return res
			.status(400)
			.json({ success: false, message: "All fields are required!" });
	}
};

const handleUserNotFound = (user, res) => {
	res.status(404).json({
		success: false,
		message: "User not found!",
	});
	return;
};

const handleDuplicateEmail = (res) => {
	return res.status(409).json({
		success: false,
		message: "Email address already exists",
		data: {},
	});
};

const handleUserAdded = (user, res) => {
	res.status(201).json({
		success: true,
		message: "User has been added successfully!",
		data: {
			user: user,
		},
	});
};

const handleUpdateUser = async (user, req, res) => {

	// Update the user data with the request body with specific fields
	user.name = req.body.name;
	user.email = req.body.email;
	user.phone = req.body.phone;

	// Save the updated user data using save() mehtod
	const updatedUser = await user.save();

	// Send a JSON response after successful update
	return res.status(200).json({
		success: true,
		message: "User updated successfully",
		data: {
			user: updatedUser,
		},
	});
};

const handleValidationErrors = (error, res) => {
	let customValidationErrors = error.errors.map((err) => ({
		field: err.path,
		message: err.message,
	}));

	res.status(400).json({
		success: false,
		message: "ValidationError",
		errors: customValidationErrors,
	});
};

const handleUserPatch = async (user, req, res) => {

	// Update the user with the request body (partial update/PATCH)
	const updatedUser = await user.update(req.body);

	// Send a JSON response after successful update
	return res.status(200).json({
		success: true,
		message: "User updated successfully",
		data: updatedUser,
	});
};

const handleUserDelete = async (user, res) => {
	await user.destroy();
	return res.status(200).json({
		success: true,
		message: "User deleted successfully!",
		data: {},
	});
};

const errorHandler = (error, req, res, next) => {
	if (error instanceof Sequelize.UniqueConstraintError) {
		return handleDuplicateEmail(res);
	}

	if (error instanceof Sequelize.ValidationError) {
		return handleValidationErrors(error, res);
	}
	if (error.status === 404) {
		res.status(error.status).json({
			error: error.message,
		});
	} else {
		res.status(error.status || 500).json({
			error: "Internal Server Error!",
		});
	}
};

module.exports = {
	handleEmptyFields,
	handleUserNotFound,
	handleDuplicateEmail,
	handleUserAdded,
	handleUpdateUser,
	handleValidationErrors,
	handleUserPatch,
	handleUserDelete,
	errorHandler,
};
