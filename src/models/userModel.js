const mongoose = require('mongoose')

const userProfileSchema = new mongoose.Schema(
      {

            jobTitle:
            {
                  type: String,
                  trim: true,
            },

            phone:
            {
                  type: Number,
                  trim: true,
                  unique: true
            },
            Skills:
            {
                  type: [String],
                  trim: true

            },
            workExperience:{
                type: String,
                trim: true
            },
            description:{
                type: String,
                trim: true
            },
            img:
               {
                type: String
                },
            hourlyRate:{
                type:Number
            }
      },

      { timestamps: true }

)

module.exports = mongoose.model('User Profile Model', userProfileSchema)