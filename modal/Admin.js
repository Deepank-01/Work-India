const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Admin = sequelize.define("Admin", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: "admin" }, // use the role as user 
}, {
    timestamps: true,
});

module.exports = Admin;
