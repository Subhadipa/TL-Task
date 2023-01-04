const mongoose = require('mongoose')

const locationSchema = new mongoose.Schema(
      {

            address:
            {
                  type: String,
                  trim: true,
            },
            currentLocation:{
                type:{type:String,trim:true},
                coordinates:[]
            }

        },
      { timestamps: true }

)
module.exports = mongoose.model('Location Model', locationSchema)