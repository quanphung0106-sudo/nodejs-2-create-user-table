const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        max: 50,
    },
    address: {
        type: String,
        required: true,
        max: 50,
    },
    status: {
        type: Boolean,
    },
},
{
    timestamps: true
}
);

module.exports = mongoose.model('User1', UserSchema);