const testRouter = require("./test");
const UserRouter = require("./auth");
const ProductRouter = require("./product");
const MallRouter = require("./mall");
const SearchRouter = require("./search");
const AdminRouter = require("./admin");
const NotifyRouter = require("./notify");

function route(app) {
    app.use("/admin", AdminRouter);
    app.use("/user", UserRouter);
    app.use("/", testRouter);
    app.use("/", SearchRouter);
    app.use("/", ProductRouter);
    app.use("/", MallRouter);
    app.use("/", NotifyRouter);
}

module.exports = route;
