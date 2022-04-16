const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RefreshToken = new Schema({
    token: String,
    user: {type: Schema.Types.ObjectId, ref :"Users"},
    
}, { timestamps: true });

module.exports = mongoose.model("RefreshTokens", RefreshToken);
