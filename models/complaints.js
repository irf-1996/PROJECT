const mongoose = require('mongoose');

const ComplaintsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type:String,
        required:true
    },
    message: {
        type:String,
        required:true
    },
    ticketId: {
        type:String,
        required:true
    },
    opened:{
        type:Boolean,
        default:false
    }
});

const Complaints = mongoose.model('complaint', ComplaintsSchema);
module.exports = Complaints;