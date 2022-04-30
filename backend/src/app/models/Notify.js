const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const NotifySchema = new Schema(
    {
        content: { type: String, maxLength: 255 },
        image: { type: String },
    },
    { timestamps: true }
);

NotifySchema.plugin(AutoIncrement, { inc_field: "notifyId" });

module.exports = mongoose.model("Notification", NotifySchema);
