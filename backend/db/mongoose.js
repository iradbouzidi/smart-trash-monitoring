// This file will handle connection logic to the MongoDB database

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/PiIot', {
mongoose.connect('mongodb+srv://smarttrashtunisia:smart1trash@cluster0-te4xm.mongodb.net/iosys_smart_trash?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB successfully :)");
}).catch((e) => {
    console.log("Error while attempting to connect to MongoDB");
});

// To prevent deprectation warnings (from MongoDB native driver)
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};
