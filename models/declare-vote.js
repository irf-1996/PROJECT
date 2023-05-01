const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    email: { type: String,required:true },
    year: { type: String, required: true },
    position: { type: String, required: true },
    img: { type: String, required: true },
    ads: [{ type: String, required: true }],
    approve: {
        type: String,
        enum:['pending','rejected','approved'],
         default: 'pending',
    },
    posRef: { type: mongoose.Schema.Types.ObjectId, ref: 'PositionsInElection' },
}, { timestamps: true })



const positionSchema = new mongoose.Schema({
    title: {
        type: String,
        
    },
    candidates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' }],
    voters: [],
    votes: [],
    winner: { type: mongoose.Schema.Types.ObjectId,ref:'Candidate'}
 
})



const electionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true

    },
    nomination_start: {
        type: String,
        required: true

    },
    nomination_end: {
        type: String,
        required: true

    },

    voting_start: {
        type: String,
        required: true

    },
    voting_end: {
        type: String,
        required: true

    },
    result_day: {
        type: String,
        required: true

    },
    // positions: [PostSchema],
    positions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PositionsInElection' }],

}, { timestamps: true });











const Candidate = mongoose.model('Candidate', candidateSchema);
const Position = mongoose.model('PositionsInElection', positionSchema);
const Election = mongoose.model('Election', electionSchema);






module.exports = {Candidate,Position,Election};