const router = require('express').Router()
const Complaints = require('../models/complaints')
const { v4: uuidv4 } = require('uuid');
const { sendTicketNumber } = require('../helpers/mail')

router.get('/', async (req, res) => {
    try {
        let candidates = await Complaints.find({})
        res.status(200).json({ data: candidates })
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/', async (req, res) => {
    try {

        const tktId = uuidv4().slice(0, 8);;
        let item = {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            ticketId: tktId
        }

        const savedItem = new Complaints(item)
        await savedItem.save();

        await sendTicketNumber(item.email, item.ticketId)
        res.status(200).json({ message: 'Complaint registered!',status:true });
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ message: 'failed!' });
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let _id = req.params.id
        await Complaints.findByIdAndDelete(_id)
        res.json({ message: 'Success!' }).status(200)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { opened } = req.body;
        const updatedData= await Complaints.findByIdAndUpdate(id, { opened })
        res.json({ message: 'Success!', data:updatedData }).status(200)

    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }


})


router.delete('/', async (req, res) => {
    try {
     const deleteAll=   await Complaints.deleteMany({})
        res.json({ message: 'Deleted All!' }).status(200)
    }
    catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})




module.exports = router