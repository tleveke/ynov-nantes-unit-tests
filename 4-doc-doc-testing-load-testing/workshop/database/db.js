module.exports = mongoose = require('mongoose');

const DB_URI = 'mongodb://mongo:27017/toDoApp';

const start = () => {
    mongoose.connect(DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("MongoDB connected");
    }).catch((err) => {
        console.log('Failed to mongodb:', err);
    });
};
start();