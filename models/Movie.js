const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
    director_id: Schema.Types.ObjectId,
    title: {
        type: String,
        required: [true, '`{PATH}` alanı zorunludur.'],
        maxlength: [15, '`{PATH}` alanı (`{VALUE}`), ({MAXLENGTH}) karakterden küçük olmalıdır.'],
        minlength: 1
    },
    category: String,
    country: String,
    year: Number,
    imdb_score: {
        type: Number,
        max: 5,
        min: 0
    },
    created_date: {
        type: Date,
        default: Date.now
    }   
});

module.exports = mongoose.model('movie', MovieSchema);