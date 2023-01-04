const userModel = require("../models/userModel")
const validation = require("../middleware/validation")

const outerFunc = {
    userProfile: async (req, res) => {
        try {
            let userData = req.body
            let { jobTitle, phone, Skills, workExperience, description, hourlyRate } = userData;

            if (!validation.isValidRequestBody(userData)) {
                return res.status(400).send({ status: false, message: "Please provide user details properly" });
            }
            if (!validation.isValid(jobTitle) || !validation.isValid(phone) || !validation.isValid(Skills) || !validation.isValid(workExperience) ||
                !validation.isValid(description) || !validation.isValid(hourlyRate)) {
                return res.status(400).send({ status: false, message: "Please provide the field" });;
            }


            if (Skills) {
                let arr = Skills.toString().split(',').map(x => x.trim())
                if (arr.length > 5) {
                    return res.status(400).send({ status: false, message: 'Only 5 skills can be added' })
                }
            }


            let usersavedData = await userModel.create(userData)

            return res.status(200).send({ status: true, message: 'Your profile is created successfully', UserDetails: usersavedData })

        } catch (err) {
            return res.status(500).send({ message: "Failed", error: err.message });
        }
    }
}

module.exports = outerFunc