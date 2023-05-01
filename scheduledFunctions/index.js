const cron = require('node-cron');
const { Election,Position } = require('../models/declare-vote')
const stvWinner = require('../helpers/stvAlgorithm')

exports.initResult = () => {

    const job = cron.schedule('0 0 */3 * *', async () => {
        console.log('checking for task')
        // Check the database for the target date
        const targetElection = await Election.findOne({}).exec()
        const resultDay = new Date(targetElection.result_day);
        // Check if the result day is today
        console.log('running1')

        if (resultDay.toDateString() === new Date().toDateString()) {
            // Run the specific task here
            console.log('running2')
            try {
                for (const position of targetElection.positions) {
                    const votes = await Position.findOne({_id:position}).exec();
                    if(votes.votes.length>0){
                        const winner =  stvWinner(votes.votes);
    
                        await Position.findByIdAndUpdate(
                            { '_id': position._id },
                            { $set: { winner: winner } }
                        ).exec();
                    }else{
                        console.log('No winner because no one voted')
                    }
                 
                }
            } catch (error) {
                console.error(err);
            }

        } else {
            console.log('Not yet...');

        }


    });

    job.start();
}
