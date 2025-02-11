const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbconnect");

const Train = sequelize.define("Train", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },  
    source: { type: DataTypes.STRING, allowNull: false },
    destination: { type: DataTypes.STRING, allowNull: false },
    totalSeats: { type: DataTypes.INTEGER, allowNull: false },
    availableSeats: { type: DataTypes.INTEGER, allowNull: false },
}, {
    timestamps: true,
});
// Train.hasMany(require("./Booking"), { foreignKey: "id", as: "Bookings" });
module.exports = Train;
