const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
    {
        _id: { type: Number },
        // name: { type: String, maxLength: 255 },
        name: { type: String },
        image: { type: String },
        // slug: { type: String, slug: "name", unique: true },
    },
    { timestamps: true, _id: false }
);

mongoose.plugin(slug);
CategorySchema.plugin(AutoIncrement, { id: "category_id", inc_field: "_id" });

module.exports = mongoose.model("Categories", CategorySchema);
