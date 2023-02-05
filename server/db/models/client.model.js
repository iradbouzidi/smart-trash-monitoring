const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
    firstNameC: {
        type: String,
        require: true,
        minlength: 1,
    },
    lastNameC: {
        type: String,
        require: true,
        minlength: 1,
    },
    cinC: {
        type: Number,
        require: true,
        minlength: 1,
    },
    birthDateC: {
        type: Date,
        require: true,
        minlength: 1,
    },
    emailC: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    cityC: {
        type: String,
        required: true,
        minlength: 1
    },
    addressC: {
        type: String,
        required: true,
        minlength: 1
    },
    userNameC: {
        type: String,
        require: true,
        minlength: 1,
        unique: true,
    },
    imageC: {
        type: String,
    },
    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = { Client };
