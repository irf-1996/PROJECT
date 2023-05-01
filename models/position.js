const mongoose = require('mongoose');

const PositionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique:true
    },
    status: {
        type:Boolean,
        default:true
    }
});

const PositionModel = mongoose.model('position', PositionSchema);
module.exports = PositionModel;