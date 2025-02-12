const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "user" }, // use the role as user 
}, {
    timestamps: true,
});

module.exports = User;
