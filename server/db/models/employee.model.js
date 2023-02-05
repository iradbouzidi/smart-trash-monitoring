const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
    firstNameE: {
        type: String,
        require: true,
        minlength: 1,
    },
    lastNameE: {
        type: String,
        require: true,
        minlength: 1,
    },
    userNameE: {
        type: String,
        require: true,
        minlength: 1,
    },
    passwordE: {
        type: String,
        required: true,
        minlength: 8
    },
    cinE: {
        type: Number,
        require: true,
        minlength: 1,
    },
    birthDateE: {
        type: Date,
        require: true,
        minlength: 1,
    },
    emailE: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true
    },
    cityE: {
        type: String,
        required: true,
        minlength: 1
    },
    addressE: {
        type: String,
        required: true,
        minlength: 1
    },
    postE: {
        type: String,
        required: true,
        minlength: 1
    },
    municipalityE: {
        type: String,
        required: true,
        minlength: 1
    },
    workingAreaE: {
        type: String,
        required: true,
        minlength: 1
    },
    availabiltyE: {
        type: String,
        require: true,
        minlength: 1,
        default :"Available !",
    },
    imageE: {
        type: String,
    },
    // with auth
    _userId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = { Employee };
