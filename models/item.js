
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema(
  {
    description: { type: String },
    fileLink: { type: String },
    s3_key: { type: String }
  },
  {
    timestamps: true
  }
);

// documentSchema.plugin(AutoIncrement, { inc_field: "document_id" });

module.exports = mongoose.model("Item", itemSchema);