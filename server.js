require("dotenv").config();
const express = require("express");
var cookieParser = require('cookie-parser')

const sequelize = require("./config/dbconnect");
const User = require("./modal/User");
const Train=require("./modal/Trains")
const Booking=require("./modal/Booking")
const Admin=require("./modal/Admin")
const app = express();
const PORT = process.env.PORT || 3000;
 const Login=require("./routers/Login")
 const Addtrain=require("./routers/Addtrain")
 const GetSeat=require("./routers/Seat")
// Middleware
app.use(express.json());
app.use(cookieParser())



// router connection
app.use("/api",Login)
app.use("/api",Addtrain)
app.use("/api",GetSeat)
//db connect 
sequelize.sync({ force: false }) // Change to true to reset tables
    .then(() => console.log("Database connected & models synced"))
    .catch((err) => console.error("Error syncing database:", err));


// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

// Test route to check database connection
app.get("/db-version", async (req, res) => {
    try {
        const result = await sql`SELECT version()`;
        res.json({ version: result[0].version });
    } catch (error) {
        res.status(500).json({ error: "Database connection failed", details: error.message });
    }
});
