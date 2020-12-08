const mongoose = require("mongoose");

const GasSchema = new mongoose.Schema({
    depotG: {
        type: String,
        require: true,
        minlength: 1,
    },
    rayonG: {
        type: String,
        require: true,
        minlength: 1,
    },
    addedDateG: {
        type: String,
        require: true,
        minlength: 1
    },
    availabiltyG: {
        type: String,
        require: true,
        minlength: 1,
        default :"Available !",
    },
    statusG: {
        type: String,
        required: true,
        minlength: 1,
        default: "RAS"
    },
    trashIdG: {
        type: String,
        required: true,
        minlength: 1,
        default: "non affected"
    }
});

const Gas = mongoose.model('Gas', GasSchema);

module.exports = { Gas };
