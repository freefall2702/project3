const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    birth: {
        type: Date,
        defaulte: ""
    },
    from: {
        type: String,
        default: ""
    },
    description: {
        type: String,
        default: ""
    },
    expected_district: {
        type: String,
        default: ""
    },
    expected_city: {
        type: String,
        default: ""
    },
    expected_cost: {
        type: Number,
        defaulte: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('users', UserSchema)