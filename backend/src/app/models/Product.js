const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
    {
        _id: { type: Number },
        name: { type: String },
        image: { type: String },
        desc: { type: String },
        price: { type: Number },
        quantity: { type: Number },
        qtySelected: { type: Number, default: 1 },
        checked: { type: Boolean, default: false },
    },
    { timestamps: true, _id: false }
);

ProductSchema.plugin(AutoIncrement, { id: "product-id", inc_field: "_id" });

module.exports = mongoose.model("Products", ProductSchema);
