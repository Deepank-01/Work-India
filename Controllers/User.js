const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../modal/User");
const Admin = require("../modal/Admin");

// Register a New User
exports.AddUser = async (req, res) => {
    try {
        const { name, email, password  } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(200).json({ error: "User exits in the db " });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: "user", 
        });

        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "user can't be created",error:err.message });
    }
};

// Login User
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Password" });
        }
            // const payload=
        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // cookie for the frontend
        option={
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
         res.cookie("token",token,option)
         res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await Admin.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid Password" });
        }
            // const payload=
        // Generate JWT Token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });
        // cookie for the frontend
        option={
            expires: new Date(Date.now() + 3*24*60*60*1000),
            httpOnly:true,
        }
         res.cookie("token",token,option)
         res.json({ message: "Login successful", token });

    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};