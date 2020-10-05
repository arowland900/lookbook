
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let itemSchema = new Schema(
    {
        name: String,
        type: String,
        tags: [String],
        photos: [String],
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
);


module.exports = mongoose.model('Item', itemSchema);