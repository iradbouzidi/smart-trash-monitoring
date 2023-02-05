const mongoose = require("mongoose");

const LevelSchema = new mongoose.Schema({
    depotL: {
        type: String,
        require: true,
        minlength: 1,
    },
    rayonL: {
        type: String,
        require: true,
        minlength: 1,
    },
    addedDateL: {
        type: String,
        require: true,
        minlength: 1
    },
    availabiltyL: {
        type: String,
        require: true,
        minlength: 1,
        default :"Available !",
    },
    statusL: {
        type: Number,
        required: true,
        minlength: 1,
        default: 0
    },
    trashIdL: {
        type: String,
        required: true,
        minlength: 1,
        default: "non affected"
    }
});

const Level = mongoose.model('Level', LevelSchema);

module.exports = { Level };
