const router = require('express').Router()
const { Election } = require('../models/declare-vote')


router.get('/', async function(req, res){


    try {

        const election = await Election.findOne({})
      .populate({
        path: 'positions',
        populate: {
          path: 'winner',
        },
      })
      .lean()
      .exec();

      const result = election.positions.map((position) => {
        return {
          title: position.title,
          winner: position.winner,
        };
      })
      .filter((position) => position.winner !== undefined && position.winner !== null);


      console.log(result)
      res.status(200).json({data:result})
        
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})






module.exports = router