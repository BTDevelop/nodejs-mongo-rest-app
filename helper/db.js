const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb://movie-user:q1w2e3r4t5y6u7@ds259499.mlab.com:59499/movie-api');
    mongoose.connection.on('open', () =>{
        console.log("MongoDB Server Connected Successful(!)");
    });
    mongoose.connection.on('error', (err) =>{
        console.log("MongoDB Server Error(!)", err);
    });

    mongoose.Promise = global.Promise;
};