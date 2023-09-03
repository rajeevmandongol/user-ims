"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					is: {
						args: /^[a-z ]+$/i,
						msg: "Name can only contains alphabets and whitespaces",
					},
				},
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						args: true,
						msg: "Provide a valid email address",
					},
				},
			},
			phone: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					is: {
						args: /^(?:\d{10}|\d{7})$/,
						msg: "Mobile number can only contain 10 digits or 7 for landline numbers",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "User",
		}
	);
	return User;
};
