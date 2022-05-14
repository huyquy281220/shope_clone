const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        username: { type: String, require: true, unique: true,trim: true},
        password: { type: String, require: true },
        email: { type: String, require: true, unique: true },
        profilePic: { type: String, default: "" },
        birthDay: { type: Date },
        isAdmin: { type: Boolean, default: false },
        cart: { type: Array, default: [] },
    },
    { timestamps: true }
);

UserSchema.plugin(AutoIncrement, { inc_field: "userId" });
module.exports = mongoose.model("Users", UserSchema);
