const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const ItemsSchema = new Schema(
    {
        _id: { type: Number },
        description: { type: String, maxLength: 500 },
        image: { type: String },
    },
    { timestamps: true, _id: false }
);

ItemsSchema.plugin(AutoIncrement);

module.exports = mongoose.model("Items", ItemsSchema);
