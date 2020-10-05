
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let outfitSchema = new Schema(
    {
        name: String,
        pieces: [{
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }],
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


module.exports = mongoose.model('Outfit', outfitSchema);