const { sendError } = require("../services/function")

exports.userRequest = (req, res) => {
    try {

    } catch (error) {
        sendError(error.message)
    }
}

exports.getListUserRequest = (req, res) => {
    try {

    } catch (error) {
        sendError(res, error.message)
    }
}
