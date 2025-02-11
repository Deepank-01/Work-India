const express=require("express")
const router=express.Router()
const{AddUser, loginUser, loginAdmin}=require("../Controllers/User")

router.post("/Singup",AddUser)
router.post("/Login/user",loginUser)
router.post("/Login/admin",loginAdmin)



module.exports=router