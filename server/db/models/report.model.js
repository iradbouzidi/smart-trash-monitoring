const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    emailR: {
        type: String,
        require: true,
        minlength: 1,
    },
    subR: {
        type: String,
        require: true,
        minlength: 10,
    },
    repR: {
        type: String,
        require: true,
        minlength: 10,
    },
    addedDateR: {
        type: String,
        require: true,
        minlength: 1,
    },
    statusR: {
        type: String,
        required: true,
        minlength: 1,
        default: "UnSeen"
    }
});

const Report = mongoose.model('Report', ReportSchema);

module.exports = { Report };
