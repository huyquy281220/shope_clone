require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 4000;
const db = require("./config/database/db");
const route = require("./routes/index");
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(cors());
//connect db
db.connect();
// view engine
app.set("view engine", "pug");

app.set("views", path.join(__dirname, "resources/views"));
app.use(express.static(path.join(__dirname, "public")));

app.use(cookieParser());
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);

route(app);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
