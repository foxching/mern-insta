const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;


const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
});

module.exports = mongoose.model('User', UserSchema);