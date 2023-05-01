const router = require('express').Router()
const { Election, Position } = require('../models/declare-vote')


router.post('/', async (req, res) => {
    try {

        let data = {

            title: req.body.title,
            nomination_start: req.body.nomination_start,
            nomination_end: req.body.nomination_end,
            voting_start: req.body.voting_start,
            voting_end: req.body.voting_end,
            result_day: req.body.result_day,
            positions: []
        }
        const newElection = new Election(data)


        for (const position of req.body.positions) {
            const newPosition = new Position({
                title: position.title,
                voters: [],
                votes: [],
            });

            let savedPosition = await newPosition.save()
            newElection.positions.push(savedPosition._id);

        }


        let insert = await newElection.save()
        res.status(201).send(insert);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    try {

        let data = await Election.find({}).populate('positions')
        res.status(201).json({ data: data })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.put('/:_id', async (req, res) => {
    try {
        let _id = req.params._id
        let body = req.body
        let updatedData = { $set: body }
        await Election.findByIdAndUpdate(_id, updatedData, { new: true })
        res.json({ message: 'updated successfully!!', status: true }).status(200)
    }
    catch (error) {
        console.log(error)
        res.json({ message: error }).status(400)
    }
})


router.delete('/:_id', async (req, res) => {
    try {
        let _id = req.params._id

        await Election.findByIdAndDelete(_id)
        res.json({ message: 'deleted successfully!!', status: true }).status(200)
    }
    catch (error) {
        console.log(error)
        res.json({ message: error }).status(400)
    }
})


router.get('/:id/position', async (req, res) => {
    try {
        let id = req.params.id;
        let data = await Election.findById(id)
            .populate('positions')
            .select('positions')
        res.status(200).json({ data: data })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/:id/position', async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let newPosition = new Position(body)
       let savedPosition = await newPosition.save()
        
        await Election.updateOne({ _id: id }, {
            $push: {
                "positions": savedPosition._id
            }
        })
        res.status(200).json({ data: 'updated Sucessfully!' })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.delete('/:id/position/:positionId', async (req, res) => {
    try {
        let { id, positionId } = req.params;

        console.log(id, positionId)

        await Election.updateOne(
            { _id: id },
            { $pull: { "positions": positionId } }
        )
        await Position.findByIdAndDelete(positionId)
        res.status(200).json({ data: 'deleted successfully' })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})


//* to add candidate 
router.post('/:id/pos/:pos_id', async (req, res) => {
    try {
        let id = req.params.id
        let pos_id = req.params.pos_id
        let data = await Election.updateOne(
            {
                _id: id,
                "positions.title": pos_id
            },
            { $push: { 'positions.$.candidates': req.body } }

        )
        console.log(data)
        res.status(200).json({ data: data })

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})



router.get('/candidates', async (req, res) => {
    try {

        let data = await Election.aggregate([
            // Unwind the positions array
            { $unwind: "$positions" },
            // Unwind the candidates array
            { $unwind: "$positions.candidates" },
            // Group the candidates by their _id and add a count field
            {
                $group: {
                    _id: "$positions.candidates._id",
                    count: { $sum: 1 },
                    candidate: { $first: "$positions.candidates" }
                }
            }
        ])

        res.status(201).json({ data: data })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

module.exports = router