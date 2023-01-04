const negotiateModel = require("../models/negotiate")
const userModel = require("../models/userModel")

const exportFunc = {
    negotiateAmount: async (req, res) => {
        try {
            let userId = req.params.userId
            let status = (req.body.status).toLowerCase()
            description = req.body.description
            let userData = await userModel.findById(userId)
            let negotiableAmount = userData.hourlyRate
            let confirmStatusObj = {}
            if (status == "rejected") {

                return res.status(200).send({ status: true, message: "You can check someone else's profile!" })

            } else if (status == "confirm") {
                confirmStatusObj = { status, description, negotiableAmount }
                let confirmDataDetails = await negotiateModel.create(confirmStatusObj)
                return res.status(200).send({ status: true, message: "Your request is confirmed successfully", data: confirmDataDetails });
            } else {
                negotiableAmount = req.body.negotiableAmount
                let negotiateStatusObj = { status, description, negotiableAmount }
                let negotiateDataDetails = await negotiateModel.create(negotiateStatusObj)
                return res.status(200).send({ status: true, message: "Your request is for negotiation send successfully", data: negotiateDataDetails });
            }
        } catch (err) {
            return res.status(500).send({ status: false, msg: err.message });
        }
    }
}

module.exports=exportFunc