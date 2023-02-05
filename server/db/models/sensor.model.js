const mongoose = require("mongoose");

const SensorSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    _trashId: {
        type: mongoose.Types.ObjectId,
        required: true
    }
});

const Sensor = mongoose.model('Sensor', SensorSchema);

module.exports = {
    Sensor
};
