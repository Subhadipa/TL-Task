const locationModel = require("../models/location")
const validation = require("../middleware/validation")


const outerFunc = {
    location: async (req, res) => {
        try {
            let locationData=req.body
            const { address, longitude, latitude } = locationData

            if (!validation.isValidRequestBody(locationData)) {
                return res.status(400).send({ status: false, message: "Please provide user details properly" });
            }
            if (!longitude || !latitude) {
                return res.status(400).send({ status: "false", message: "Either longitude or latitude is not present!" })
            }
            let locationDetails = {
                address: req.body.address,
                currentLocation: {
                    type: "Point",
                    coordinates: [parseFloat(longitude), parseFloat(latitude)]
                }
            }
            let locationsavedDetails = await locationModel.create(locationDetails)
            return res.status(200).send({ status: true, message: 'Location is added successfully!', locationDetails: locationsavedDetails })
        } catch (err) {
            return res.status(500).send({ message: "Failed", error: err.message });
        }
    }
}

module.exports = outerFunc