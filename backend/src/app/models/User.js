const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, require: true, unique: true },
        password: { type: String, require: true, unique: true },
        email: { type: String, require: true, unique: true },
        profilePic: { type: String, default: "" },
        isAdmin: { type: Boolean, default: false },
        isOnline: { type: Boolean, default: false },
        cart: { type: Array, default: [] },
    },
    { timestamps: true }
);

UserSchema.plugin(AutoIncrement, { inc_field: "userId" });
module.exports = mongoose.model("Users", UserSchema);
