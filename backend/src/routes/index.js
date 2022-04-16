const testRouter = require("./test");
const UserRouter = require("./auth");
const ProductRouter = require("./product");
const MallRouter = require("./mall");
const SearchRouter = require("./search");
const AdminRouter = require("./admin");

function route(app) {
    app.use("/admin", AdminRouter);
    app.use("/user", UserRouter);
    app.use("/", testRouter);
    app.use("/", SearchRouter);
    app.use("/", ProductRouter);
    app.use("/", MallRouter);
}

module.exports = route;
