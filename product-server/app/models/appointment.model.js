const mongoose = require("mongoose");

const Appointment = mongoose.model(
    "Appointment",
    new mongoose.Schema({
        buyer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        status: Number,
        time: Date,
    })
);

module.exports = Appointment;
