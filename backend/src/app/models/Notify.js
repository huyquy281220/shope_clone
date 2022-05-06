const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const NotifySchema = new Schema(
    {
        title: { type: String, maxLength: 70 },
        content: { type: String, maxLength: 255 },
        image: { type: String },
    },
    { timestamps: true }
);

NotifySchema.plugin(AutoIncrement, { inc_field: "notifyId" });

module.exports = mongoose.model("Notification", NotifySchema);
