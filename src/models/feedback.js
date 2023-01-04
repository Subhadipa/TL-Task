const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({

    feedbackedBy: {
        type: String,
        required: true,
        default: 'Guest',
        trim: true
    },
    feedbackedAt: {
        type: Date,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        trim: true
    },
    feedback: {
        type: String,
        trim: true

    },
    isDeleted: {
        type: Boolean,
        default: false
    },
},
    { timestamps: true }
)

module.exports = mongoose.model('feedback Model', feedbackSchema)