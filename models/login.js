const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginSchema = new Schema({
    email: {
        type: String,
        required: true
    },

    otp: {
        type: String,
    },


    admin:{type:Boolean, default: false}
}, {
    timestamps: true,
});

let loginModel = mongoose.model('login', loginSchema);

module.exports = loginModel;