const mongoose = require("mongoose");

const TrashSchema = new mongoose.Schema({
    cityT: {
        type: String,
        require: true,
        minlength: 1,
    },
    municipalityT: {
        type: String,
        require: true,
        minlength: 1,
    },
    areaT: {
        type: String,
        require: true,
        minlength: 1,
    },
    addedDateT: {
        type: String,
        require: true,
        minlength: 1,
    },
    flammeId: {
        type: String,
        require: true,
        minlength: 1,
    },
    gasId: {
        type: String,
        require: true,
        minlength: 1,
    },
    levelId: {
        type: String,
        require: true,
        minlength: 1,
    },
    weightId: {
        type: String,
        require: true,
        minlength: 1,
    }
});

const Trash = mongoose.model('Trash', TrashSchema);

module.exports = { Trash };
