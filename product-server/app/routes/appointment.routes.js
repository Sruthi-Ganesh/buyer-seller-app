const { authJwt } = require("../middlewares");
const controller = require("../controllers/appointment.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/appointment/schedule", [authJwt.verifyToken, authJwt.isBuyer], controller.scheduleAppointment
    );

    app.get(
        "/api/appointment/pending", [authJwt.verifyToken, authJwt.isSeller], controller.getAllPendingAppointment
    );

    app.post(
        "/api/appointment/:id/approve", [authJwt.verifyToken, authJwt.isSeller], controller.approveAppointment
    );

    app.post(
        "/api/appointment/:id/cancel", [authJwt.verifyToken, authJwt.isSeller], controller.cancelAppointment
    );

    app.get(
        "/api/appointment", [authJwt.verifyToken, authJwt.isSeller], controller.getAllAppointment
    );
};
