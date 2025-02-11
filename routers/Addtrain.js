const express=require("express")
const { Authentication, isAdmin } = require("../middleware/Auth")
const { addtrain } = require("../Controllers/Addtrain")
const router=express.Router()
// const 
router.post("/addtrain",Authentication,isAdmin,addtrain)

module.exports=router