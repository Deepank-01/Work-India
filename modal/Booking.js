const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");
const User = require("./User");
const Train = require("./Trains");

const Booking = sequelize.define("Booking", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: User, key: "id" }
    },
    trainId: { 
        type: DataTypes.INTEGER, 
        allowNull: false, 
        references: { model: Train, key: "id" }
    },
    seatsBooked: { type: DataTypes.INTEGER, defaultValue: 1 },

}, {
    timestamps: true,
});

module.exports = Booking;
