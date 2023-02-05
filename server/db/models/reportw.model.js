const mongoose = require("mongoose");

const ReportWSchema = new mongoose.Schema({
    emailRW: {
        type: String,
        require: true,
        minlength: 1,
    },
    subRW: {
        type: String,
        require: true,
        minlength: 10,
    },
    repRW: {
        type: String,
        require: true,
        minlength: 10,
    },
    addedDateRW: {
        type: String,
        require: true,
        minlength: 1,
    },
    statusRW: {
        type: String,
        required: true,
        minlength: 1,
        default: "UnSeen"
    }
});

const ReportW = mongoose.model('ReportW', ReportWSchema);

module.exports = { ReportW };
