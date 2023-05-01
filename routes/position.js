const router = require('express').Router()
const PositionModel = require('../models/position')

router.post('/', async (req, res) => {
    try {
        console.log(req.body)
        const item = new PositionModel(req.body)
         const savedData = await item.save()
        res.status(201).json({message:'success!' , data:savedData});
    }
    catch (error) {
        console.log(error)
        res.status(400).json({message:'failed!'});
    }
})

router.get('/', async (req, res) => {
    try {
        let pos = await PositionModel.find({})
        res.json({data:pos}).status(200)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/:_id', async (req, res) => {
    try {
        let id = req.params._id
        let doc = await PositionModel.findById( id )
        if(!doc) throw('No document found')

        const currentValue = doc.status;
        const newValue = !currentValue;

         await PositionModel.findByIdAndUpdate(id,{$set:{status:newValue}},{ new: true })

        res.json({message:'Success'}).status(200)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.put('/:_id', async (req, res) => {
    try {
        let _id = req.params._id
        let body = req.body
        let updatedData = { $set: body }
        let updated = await CandidateModel.findByIdAndUpdate(_id, updatedData, { new: true })
        updated ? res.status(201).send(updated) : res.status(400).send({ message: "Candidate not found with this id" })
    }
    catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:_id', async (req, res) => {
    try {
        let _id = req.params._id
        let deleted = await PositionModel.findByIdAndDelete({ _id })
        res.json({message:'Success!'}).status(200)
        // res.send(deleted)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router