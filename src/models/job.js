const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId;
const jobSchema = new mongoose.Schema(
      {

            jobList:
            {
                  type:String,
                  trim: true,
            },
            description:{
                type:String,
                trim:true,
            },
            location:{
                type:String,
                trim:true,
               
            },
            userId:
                {
                        type: ObjectId,
                        ref: 'User Profile Model',
                        required: true
                },
            status:{
                type:String,
                enum:['Active','Pending','Done'],
                trim:true,
                default: 'Pending',
            },
            feedbacks:{
                type:Number,
                default:0

            },
            isDeleted:{
                type:Boolean,
                trim:true,
                default:false
            }

        },
      { timestamps: true }

)

module.exports = mongoose.model('Job Model', jobSchema)