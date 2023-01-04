const mongoose = require("mongoose");


const negotiateSchema = new mongoose.Schema({

    status:{
        type:String,
        enum:['reject','negotiate','confirm'],
        trim:true,
    },
    description: {
        type:String,
        trim:true,
    },
    negotiableAmount:{
        type:Number,
        trim:true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Negotiate Model', negotiateSchema)