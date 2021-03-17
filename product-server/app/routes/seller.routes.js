const { authJwt } = require("../middlewares");
const controller = require("../controllers/seller.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/seller/all", [authJwt.verifyToken], controller.getSellers
    );

    app.get(
        "/api/seller", [authJwt.verifyToken], controller.getCurrentSeller
    );

    app.put(
        "/api/seller", [authJwt.verifyToken, authJwt.isSeller], controller.changeSchedule
    );
};
