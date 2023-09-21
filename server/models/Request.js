const mongoose = require('mongoose');
const Owner = require('./Owner');
const User = require('./User');
const Boarding = require('./Boarding');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
    boarding: {
        type: Schema.Types.ObjectId,
        ref: "boardings"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    },
    title: {
        type: String,
        required: true,

    },
    description: {
        type: String,
        required: true,

    },
    numOfPer: {
        type: Number
    },
    time: {
        type: Date,
    },
    status: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('requests', RequestSchema)