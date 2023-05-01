const express = require('express')
const helmet = require("helmet");
const cors = require('cors')
const logger =require('morgan')
const compression = require('compression')
const scheduledFunctions = require('./scheduledFunctions')

require('dotenv').config() //environmental variables
require('./db') //DB initialisation
const PORT = 3400 || process.env.PORT

const app = express()
app.use(helmet({crossOriginResourcePolicy: false}));
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(compression())
scheduledFunctions.initResult();
// routeHandler 
app.use('/api',require('./routes'))






  //Apis 
  app.use('/api/candidate', require('./routes/candidate'))

  //login apis
  app.use('/api/authentication', require('./routes/auth'))


app.listen(PORT, () => { console.log(`Server is running at ${PORT}`) })
  