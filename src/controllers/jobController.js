const jobModel = require("../models/job")
const userModel = require("../models/userModel")
const validation = require("../middleware/validation")

const outerFunc = {
    createJob: async (req, res) => {
        try {
            let jobData = req.body
            let { jobList, description, location, userId, status, isDeleted } = jobData;

            if (!validation.isValidRequestBody(jobData)) {
                return res.status(400).send({ status: false, message: "Please provide user details properly" });
            }
            if (!validation.isValid(jobList) || !validation.isValid(description) || !validation.isValid(location) || !validation.isValid(userId)) {
                return res.status(400).send({ status: false, message: "Please provide the field" });;
            }


            let jobsavedData = await jobModel.create(jobData)

            return res.status(200).send({ status: true, message: 'Job is created successfully', JobDetails: jobsavedData })

        } catch (err) {
            return res.status(500).send({ message: "Failed", error: err.message });
        }
    },
    getJobById: async (req, res) => {
        try {
            let userId = req.params.userId
            const validId = await userModel.findById(userId)
            if (validId) {
                const jobsavedDetails = await jobModel.find({ userId: validId, isDeleted: false })
                return res.status(201).send({ status: true, message: 'Job list fetched successfully!', JobDetails: jobsavedDetails })
            }
            return res.status(400).send({ status: false, msg: "No job is created for this user id!" })
        } catch (err) {
            return res.status(500).send({ message: "Failed", error: err.message });
        }
    },
    getJobByStatus: async (req, res) => {
         try {
            let jobStatus = req.body.status
             let userId = req.params.userId
           
            const validId = await userModel.findById(userId)
            if (validId) {
            let jobList = await jobModel.find({userId:validId,status: jobStatus, isDeleted: false })
            return res.status(200).send({ status: true, message: 'Job list fetched successfully!', JobDetails: jobList })
            }
           return res.status(400).send({ status: false, msg: "either job doesn't exist or nothing found in the section!" })
        } catch (err) {
            return res.status(500).send({ message: "Failed", error: err.message });
        }
    }
}

module.exports = outerFunc