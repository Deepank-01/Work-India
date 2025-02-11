const express=require("express")
const { getSeatAvailability, bookSeat, getUserBookings } = require("../Controllers/Seat")
const { Authentication, isUser } = require("../middleware/Auth")
const router=express.Router()

router.post("/GetSeat",getSeatAvailability)
router.post("/bookseat",Authentication,isUser,bookSeat)
router.get("/bookingdetails",Authentication,isUser,getUserBookings)
module.exports=router