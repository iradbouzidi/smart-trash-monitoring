const mongoose = require("mongoose");

const TruckSchema = new mongoose.Schema({
    addedDateT: {
        type: String,
        require: true,
        minlength: 1,
    },
    driverT: {
        type: String,
        require: true,
        minlength: 1
    },
    conveyorT: {
        type: String,
        required: true,
        minlength: 1
    },
    levelIdT: {
        type: String,
        require: true,
        minlength: 1,
    },
    weightIdT: {
        type: String,
        require: true,
        minlength: 1,
    },
    workingAreaT: {
        type: String,
        required: true,
        minlength: 1
    }
});

const Truck = mongoose.model('Truck', TruckSchema);

module.exports = { Truck };
