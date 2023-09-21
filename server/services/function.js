exports.success = (res, data) => {
    res.send({ success: true, data: data });
}

exports.sendError = (res, message) => {
    res.status(404).json({ success: false, error: message });
}