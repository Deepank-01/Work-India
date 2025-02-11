

const { Sequelize } = require("sequelize");
const Booking = require("../modal/Booking");
const Train = require("../modal/Trains"); 

const sequelize = require("../config/dbconnect"); // Sequelize instance


exports.getSeatAvailability = async (req, res) => {
    try {
        const { source, destination } = req.body;

        // Validate input
        if (!source || !destination) {
            return res.status(400).json({ message: "Source and destination are required" });
        }

        // Find all trains between source and destination
        const trains = await Train.findAll({
            where: { source, destination },
            attributes: ["name", "availableSeats","id"], // Select only name & available seats
        });
        
        if (trains.length === 0) {
            return res.status(200).json({ message: "No trains found between the given locations" });
        }

        res.status(200).json({ trains });
    } catch (error) {
        console.error("Error fetching seat availability:", error.message);
        res.status(500).json({ message: "Internal server error" ,error:error.message});
    }
};


exports.bookSeat = async (req, res) => {
    const { trainId, seatsRequired } = req.body;
    const userId = req.user.id; 

    if (!trainId || !seatsRequired || seatsRequired <= 0 || !userId) {
        return res.status(400).json({ message: "Invalid input data" });
    }

    try {
        // Start a transaction to handle race conditions
        await sequelize.transaction(async (t) => {
            // Lock the train row to prevent race conditions
            const train = await Train.findOne({
                where: { id: trainId },
                attributes: ["id", "availableSeats", "name" ,"source","destination"],
                transaction: t,
                lock: t.LOCK.UPDATE, // Lock row until transaction completes
            });

            if (!train) {
                throw new Error("Train not found");
            }

            if (train.availableSeats < seatsRequired) {
                throw new Error("Not enough seats available");
            }

            // Deduct available seats
            train.availableSeats -= seatsRequired;
            await train.save({ transaction: t });
            console.log(train)
            // Create a new booking record
            const booking = await Booking.create(
                {
                    userId,
                    trainId,
                    seatsBooked: seatsRequired,
                   
                },
                { transaction: t }
            );

            res.status(200).json({
                message: "Booking successful",
                trainName: train.name,
                seatsBooked: seatsRequired,
                bookingId: booking.id,
            });
        });
    } catch (error) {
        console.error("Booking error:", error.message);
        res.status(400).json({ message: error.message });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id; // Extracted from authentication middleware

        // Fetch booking details with train information
        const bookings = await Booking.findAll({
            where: { userId },
            attributes: ["seatsBooked", "createdAt","trainId"], // Booking fields
           
            order: [["createdAt", "DESC"]], // Sort by latest bookings
        });
        
      
        if (bookings.length === 0) {
            return res.status(404).json({ message: "No bookings found for this user" });
        }
        // const trainId=bookings[0]?.dataValues?.trainId
        // const train_details=await Train.findOne({
        //     where:{ id:trainId},
        //     attributes: ["source", "destination"],
        //    })


        res.status(200).json({ bookings});
    } catch (error) {
        console.error("Error fetching booking details:", error.message);
        res.status(500).json({ message: "Internal server error" ,error:error.message});
    }
};