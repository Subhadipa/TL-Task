const express = require('express');
const router = express.Router();

const userController=require("../controllers/userController")
const locationController=require("../controllers/location")
const jobController=require("../controllers/jobController")
const feedbackController=require("../controllers/feedback")
const negotiateController=require("../controllers/negotiateController")

router.post("/createProfile",userController.userProfile)
router.post("/location",locationController.location)

router.post("/createJob",jobController.createJob)
router.get("/getJob/:userId",jobController.getJobById)
router.get("/getJobs/:userId",jobController.getJobByStatus)

router.post("/feedback/:jobId",feedbackController.createFeedback)
router.put('/job/:jobId/feedback/:feedbackId', feedbackController.updateFeedback)
router.delete('/job/:jobId/feedback/:feedbackId', feedbackController.deletefeedback)

router.post("/status/:userId",negotiateController.negotiateAmount)
module.exports=router

