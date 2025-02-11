const { Pool } = require("pg");
const jwt = require("jsonwebtoken");
const Train = require("../modal/Trains");
require("dotenv").config();

// Database connection

exports.addtrain=async(req,res)=>{
    try{
            const { name, source, destination, totalSeats } = req.body; // from the admin
    if(!name || !source || !destination || ! totalSeats){
        return res.status(400).json({
            message:"Incomplete data"
        })
    }

    const newTrain = await Train.create({ name, source, destination, totalSeats, availableSeats: totalSeats });

    res.status(200).json({ message: "Train added successfully", train: newTrain });
}
 
    catch(err){
               res.status(500).json({message:"Error in adding the train data",error:err.messagea})
    }
}
