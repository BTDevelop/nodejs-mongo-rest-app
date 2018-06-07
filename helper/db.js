const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie-user:q1w2e3r4t5y6u7@ds259499.mlab.com:59499/movie-api', {useMongoClient: true});
    mongoose.connection.on('open', () =>{
        console.log("MongoDB connected");
    });
    mongoose.connection.on('error', (err) =>{
        console.log("MongoDB Error", err);
    });

    mongoose.Promise = global.Promise;
};