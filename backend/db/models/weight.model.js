const mongoose = require("mongoose");

const WeightSchema = new mongoose.Schema({
    depotW: {
        type: String,
        require: true,
        minlength: 1,
    },
    rayonW: {
        type: String,
        require: true,
        minlength: 1,
    },
    addedDateW: {
        type: String,
        require: true,
        minlength: 1
    },
    availabiltyW: {
        type: String,
        require: true,
        minlength: 1,
        default :"Available !",
    },
    statusW: {
        type: Number,
        required: true,
        minlength: 1,
        default: 0
    },
    trashIdW: {
        type: String,
        required: true,
        minlength: 1,
        default: "non affected"
    },
});

const Weight = mongoose.model('Weight', WeightSchema);

module.exports = { Weight };
