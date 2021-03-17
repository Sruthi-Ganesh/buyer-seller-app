const mongoose = require("mongoose");

const Seller = mongoose.model(
    "Seller",
    new mongoose.Schema({
        availableFrom: Date,
        availableTo: Date,
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    })
);

module.exports = Seller;
