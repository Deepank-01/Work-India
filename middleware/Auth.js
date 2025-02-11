const { Pool } = require("pg");
const User = require("../modal/User");
const jwt = require("jsonwebtoken");
const Admin = require("../modal/Admin");
require("dotenv").config();

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});
exports. Authentication=async (req,res,next)=>{
    try{
        const token=req.body.token || req.cookies.token 
        if(!token){
          return res.status(400).json({ message: "Unauthorized - No Token Provided" });
        }
        const payload=jwt.verify(token,process.env.JWT_SECRET)
        if(!payload) return res.status(401).json({ message: "Unauthorized - Invalid Token" });
        // Fetch user from PostgreSQL database (excluding password)
        // const query = `SELECT id, name, email, role FROM Users WHERE id = $1`;
        // const { rows } = await User.query(query, [payload.id]);

        // if (rows.length === 0) {
        //     return res.status(400).json({ message: "User not found" });
        // }

        // req.user = rows[0]; // Attach user data to the request
        // next();
        var userData
        if(payload.role=="admin"){
          userData = await Admin.findOne({
                where: { id: payload.id },
                attributes: { exclude: ["password","role"] },
            });
        }
       else if(payload.role=="user"){
        userData = await User.findOne({
            where: { id: payload.id },
            attributes: { exclude: ["password","role"] },
        });
       }
        if (!userData) {
            return res.status(400).json({ message: "User not found" });
        }

        req.user = {
            ...userData.toJSON(), // Convert Sequelize instance to plain JSON
            role: payload.role, // Manually add role from token
        };
        
        next();

  }
  catch(err){
    const token=req.body.token || req.cookies.token 
      console.log("Error ", token);

      res.status(500).json({ message: "Auth error ",sucess:false,err:err.message,token:token});
  }
}

exports.isAdmin=async(req,res,next)=>{
    try{
        const role=req.user.role;
        if(role=="admin"){
            next();
        }
        else{
            return res.status(400).json({message:"Not admin",success:false})
        }
    }
    catch(err){
        res.status(500).json({ message: "AuthZ in the admin ",sucess:false,err:err.message});
    }
}


exports. isUser=async(req,res,next)=>{
    try{
        const role=req.user.role;
        if(role!="user"){
            return res.status(400).json({message:"Not User",success:false})
        }
        next()
    }
    catch(err){
        res.status(500).json({ message: "AuthZ in the User",sucess:false,err:err.message});
    }
}