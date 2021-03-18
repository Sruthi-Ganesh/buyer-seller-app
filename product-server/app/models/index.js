const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.seller = require("./seller.model");
db.appointment = require("./appointment.model");

db.ROLES = ["seller", "admin", "buyer"];

module.exports = db;