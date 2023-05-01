const Joi = require('joi')

//Joi autherization schema

//Fields - name, image, department
const candidateJoi = Joi.object({
    name: Joi.string()
        .required(),

    image: Joi.string(),

    department: Joi.string()
})

const votingJoi = Joi.object({
    title: Joi.string()
        .required(),

    startTime: Joi.date()
        .required(),

    endTime: Joi.date()
        .required(),

    candidates: Joi.array(),
})

module.exports = { candidateJoi, votingJoi}