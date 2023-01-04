const jobModel = require('../models/job');
const feedbackModel = require('../models/feedback');

const ObjectId = require('mongoose').Types.ObjectId;

const exportFunc = {
    createFeedback: async (req, res) => {
        try {
            
            let jobId = req.params.jobId
            const findJob = await jobModel.findOne({ _id: jobId  });
            if (!findJob) {
                return res.status(400).send({ status: false, msg: "This job deosn't exist" });
            }
            if (findJob.isDeleted == true) {
                return res.status(400).send({ status: false, msg: "The job on which you want to make feedback is no longer exist" });
            }
            const { _id, feedbacks } = findJob
            const feedbackDetails = req.body
           
            const { feedbackedBy, rating, feedback } = feedbackDetails
            
            if (rating < 1 || rating > 5) {
                return res.status(400).send({ status: false, message: "Please do rating between 1 and 5" });;
            }
            let JobId = _id
            let feedbackedAt = new Date()
            let myfeedback = { JobId, feedbackedBy, rating, feedback, feedbackedAt }
            const feedbackCreated = await feedbackModel.create(myfeedback);
            const feedbackData = await feedbackModel.findOne(feedbackCreated)
            if (feedbackCreated) {
                let updatefeedback = await jobModel.findOneAndUpdate({ _id: _id,isDeleted:false}, { feedbacks: feedbacks + 1 })
                if (updatefeedback) {
                    return res.status(201).send({ status: true, message: "success", data: feedbackData });
                }
            }
        }
        catch (err) {
            return res.status(500).send({ status: false, msg: err.message });
        }
    },
    updateFeedback: async (req, res) => {
        try {
            const jobParams = req.params.jobId;
            
            const findJob = await jobModel.findOne({ _id: jobParams });
            if (!findJob) {
                return res.status(404).send({ status: false, msg: "This job Doesn't exist" });
            }
            const feedbackParams = req.params.feedbackId;
            let updateBody = req.body
           
            const { feedbackedBy, rating, feedback } = updateBody
            
            if (rating < 1 || rating > 5) {
                return res.status(400).send({ status: false, message: "Please do rating between 1 and 5" });;
            }
            if (findJob.isDeleted == true) {
                return res.status(400).send({ status: false, msg: "The job on which you want to make feedback is no longer exist" });
            }
            const feedbackUpdate = await feedbackModel.findOne({ _id: feedbackParams });
            if (!feedbackUpdate) {
                return res.status(404).send({ status: false, msg: "This feedback doesn't exist" });
            }
            if (feedbackUpdate.isDeleted == true) {
                return res.status(404).send({ status: false, msg: "The feedback in which you want update is no longer exist" });
            }
            if (feedbackedBy) {
                feedbackUpdate.feedbackedBy = feedbackedBy;
            }
            if (rating) {
                feedbackUpdate.rating = rating;
            }
            if (feedback) {
                feedbackUpdate.feedback = feedback;
            }
            feedbackUpdate.save();
            return res.status(200).send({ status: true, message: "Feedback is updated successfully", data: feedbackUpdate });
        }
        catch (err) {
            return res.status(500).send({ status: false, msg: err.message });
        }
    },
    deletefeedback: async (req, res) => {
        try {
            const jobsParam = req.params.jobId;
            
            const feedbacksParams = req.params.feedbackId;
           
            const jobFind = await jobModel.findOne({ _id: jobsParam });
            if (!jobFind) {
                return res.status(404).send({ status: false, msg: "This job  doesn't exist" });
            }
            if (jobFind.isDeleted == true) {
                return res.status(404).send({ status: false, msg: "The job is no longer exist" });
            }

            const { _id, feedbacks } = jobFind
            const feedbackData = await feedbackModel.findOne({ _id: feedbacksParams });
            if (!feedbackData) {
                return res.status(404).send({ status: false, msg: "This feedback doesn't exist" });
            }
            if (feedbackData.isDeleted == true) {
                return res.status(404).send({ status: false, msg: "This feedback has already been deleted" });
            }
            feedbackData.isDeleted = true;
            feedbackData.save();
            let feedbackDeleted = await jobModel.findOneAndUpdate({ _id: _id }, { feedbacks: feedbacks - 1 })
            let feedbackjobData = await jobModel.findOne({ _id: _id }).select({ title: 1 })
            if (feedbackDeleted) {
                return res.status(200).send({ status: true, msg: "feedback is deleted successfully", data: { feedback_deleted_for: feedbackjobData, feedbackData: feedbackData } });
            }
        }
        catch (err) {
            return res.status(500).send({ status: false, msg: err.message });
        }
    }
}
module.exports = exportFunc