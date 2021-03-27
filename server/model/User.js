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
    pic:{
        type:String,
        default:"https://res.cloudinary.com/dtvqrqyqr/image/upload/v1616857075/_no-user-image_igexce.gif"
    },
    followers:[{type:ObjectId,ref:"User"}],
    following:[{type:ObjectId,ref:"User"}]
});

module.exports = mongoose.model('User', UserSchema);