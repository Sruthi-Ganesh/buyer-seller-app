const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;
const Seller = db.seller;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.changeSchedule = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Seller.findOne({ user: user }, (err, seller) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!seller) {
                res.status(500).send({ message: 'Not a seller' });
                return;
            }
            seller.availableFrom = req.body.availableFrom;
            seller.availableTo = req.body.availableTo;

            seller.save(err => {
                if (err) {
                    res.status(500).send({ message: err });
                    return;
                }
                res.send({ message: "Schedule changed for seller successfully!" });
            });
        });
    });
};


exports.getSellers = (req, res) => {
    Seller.find({}).populate("user", "-__v").exec((err, sellers) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        let sellers_resp = [];
        for (let i = 0; i < sellers.length; i++) {
            let seller = sellers[i];
            sellers_resp.push({
                name: seller.user.username,
                availableFrom: seller.availableFrom,
                availableTo: seller.availableTo,
                email_address: seller.user.email,
                id: seller.user._id,
            })
        }
        res.send({ message: "Retrieved sellers!", data: sellers_resp });
    })
};

exports.getCurrentSeller = (req, res) => {
    User.findById(req.userId).exec((err, user) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        Seller.findOne({ user: user }, (err, seller) => {
            if (err) {
                res.status(500).send({ message: err });
                return;
            }
            if (!seller) {
                res.status(500).send({ message: 'Not a seller' });
                return;
            }

            var seller_resp = {
                name: seller.user.username,
                availableFrom: seller.availableFrom,
                availableTo: seller.availableTo,
                email_address: seller.user.email
            }
            res.send({ message: "Retrieved sellers!", data: seller_resp });
        })
    })
};
