const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Seller = db.seller;
const Appointment = db.appointment;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const APPOINTMENT_STATUS = require("../helpers/constants");

exports.scheduleAppointment = (req, res) => {
    User.findById(req.userId).exec((err, buyer) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        User.findById(req.body.sellerId).exec((err, seller_user) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            Seller.findOne({ user: seller_user }, (err, seller) => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                if (!seller) {
                    res.status(500).send({ message: 'Not a seller' });
                    return;
                }
                let scheduledAt = new Date(req.body.scheduledAt).toISOString();
                let availableFrom = new Date(seller.availableFrom).toISOString();
                let availableTo = new Date(seller.availableTo).toISOString();
                if (availableTo >= scheduledAt && scheduledAt >= availableFrom) {
                    const appointment = new Appointment({
                        buyer: buyer,
                        seller: seller_user,
                        time: scheduledAt,
                        status: APPOINTMENT_STATUS.PENDING,
                        seller_email: seller_user.email,
                    })

                    appointment.save(err => {
                        if (err) {
                            res.status(500).send({ message: err });
                            return;
                        }
                        res.send({ message: "Appointment was fixed successfully!" });
                    });
                } else {
                    res.status(500).send({ message: 'Seller not available in the specified time' });
                    return;
                }

            });
        });
    })
};

exports.getAllPendingAppointment = (req, res) => {
    Appointment.find({ status: APPOINTMENT_STATUS.PENDING })
        .populate("seller", "-__v")
        .populate("buyer", "-__v")
        .exec((err, appointments) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            let appointment_resp = []
            for (let i = 0; i < appointments.length; i++) {
                let appointment = appointments[i];
                appointment_resp.push({
                    buyer: appointment.buyer.username,
                    seller: appointment.seller.username,
                    status: appointment.status,
                    scheduledAt: appointment.time,
                    id: appointment._id,
                    buyer_email: appointment.buyer.email,
                });
            }
            res.send({ message: "Retrieved Appointments!", data: appointment_resp });
        })
}

exports.getAllAppointment = (req, res) => {
    Appointment.find({})
        .populate("seller", "-__v")
        .populate("buyer", "-__v")
        .exec((err, appointments) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }

            let appointment_resp = []
            for (let i = 0; i < appointments.length; i++) {
                let appointment = appointments[i];
                appointment_resp.push({
                    buyer: appointment.buyer.username,
                    seller: appointment.seller.username,
                    status: appointment.status,
                    scheduledAt: appointment.time,
                    id: appointment._id,
                    buyer_email: appointment.buyer.email,
                });
            }
            res.send({ message: "Retrieved Appointments!", data: appointment_resp });
        })
}

exports.approveAppointment = (req, res) => {
    let appointmentId = req.params.id
    Appointment.findById(appointmentId)
        .exec((err, appointment) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            appointment.status = APPOINTMENT_STATUS.APPROVED;
            appointment.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "Appointment was approved successfully!" });
            });
        })
}

exports.cancelAppointment = (req, res) => {
    let appointmentId = req.params.id
    Appointment.findById(appointmentId)
        .exec((err, appointment) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            appointment.status = APPOINTMENT_STATUS.CANCELLED;
            appointment.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "Appointment was cancelled successfully!" });
            });
        })
}