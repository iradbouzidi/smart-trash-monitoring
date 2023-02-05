const mongoose = require("mongoose");

const FlammeSchema = new mongoose.Schema({
    depotF: {
        type: String,
        require: true,
        minlength: 1,
    },
    rayonF: {
        type: String,
        require: true,
        minlength: 1,
    },
    addedDateF: {
        type: String,
        require: true,
        minlength: 1,
    },
    availabiltyF: {
        type: String,
        require: true,
        minlength: 1,
        default :"Available !",
    },
    statusF: {
        type: String,
        required: true,
        minlength: 1,
        default: "CRITICAL"
    },
    trashIdF: {
        type: String,
        required: true,
        minlength: 1,
        default: "non affected"
    }
});

const Flamme = mongoose.model('Flamme', FlammeSchema);

module.exports = { Flamme };
