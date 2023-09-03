/**
 * Import User model to perform the CRUD operations efficiently
 */
const { User } = require("../models");


/**
 * Helper functions hides the complex code structure and statements
 * while having a readable and meaningful names
 * as per their functionality and their usages
 */
const {
	handleEmptyFields,
	handleUserNotFound,
	handleUserAdded,
	handleUpdateUser,
	handleUserPatch,
	handleUserDelete,
} = require("../helper/userHelper");



/**
 * Called by the post method along with the request body containing name, email and phone
 * @param req
 * @param res
 * @param next
 * @returns response HTTP status along with the appropriate JSON
 */
const createUser = async (req, res, next) => {
	try {
		handleEmptyFields(req, res);
		const user = await User.create(req.body);
		return handleUserAdded(user, res);
	} catch (error) {
		next(error);
	}
};

const updateUserById = async (req, res, next) => {
	const userId = req.params.id;
	try {
		handleEmptyFields(req, res);
		const user = await User.findByPk(userId);
		if (!user) {
			return handleUserNotFound(user, res);
		}
		await handleUpdateUser(user, req, res);
	} catch (error) {
		next(error);
	}
};

const updateUserPartialsById = async (req, res, next) => {
	const userId = req.params.id;
	try {
		const user = await User.findByPk(userId);
		if (user === null) {
			return handleUserNotFound(user, res);
		}
		await handleUserPatch(user, req, res);
	} catch (error) {
		next(error);
	}
};

const deleteUserById = async (req, res, next) => {
	const userId = req.params.id;
	try {
		const user = await User.findByPk(userId);
		if (user === null) {
			return handleUserNotFound(user, res);
		}
		await handleUserDelete(user, res);
	} catch (error) {
		next(error);
	}
};

const getAllUsers = async (req, res, next) => {
	const users = await User.findAll();
	if (users.length === 0) {
		return res.status(204).json({
			success: false,
			message: "No Users found",
			data: {},
		});
	}
	return res.status(200).json({
		success: true,
		message: "Users found",
		data: {
			users,
		},
	});
};

const getUserById = async (req, res, next) => {
	let id = req.params.id;
	user = await User.findByPk(id);
	if (user === null) {
		return handleUserNotFound(user, res);
	}
	return res.status(200).json({
		success: true,
		message: "User found",
		data: {
			user: user,
		},
	});
};


// Export all the methods so that these can be utilized by API endpoints
module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUserById,
	updateUserPartialsById,
	deleteUserById,
};
