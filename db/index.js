const mongoose = require("mongoose");
const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'
const Login = require('../models/login')
mongoose
  .connect(mongoURI, {
    dbName: 'STV',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {

    
    const item = {
      email: 'admin@roehampton.com',
      otp:124,
      admin:true
    };

    const doesExist = await Login.findOne({ email: item.email })
    if (!doesExist) {
      const data = new Login(item)
      await data.save()
    }

    console.log(`mongodb connected `);
  })
  .catch((error) => {
    console.log(`Error:${error.message}`);
  });



  mongoose.connection.on("connected", () => {
    console.log(`Mongoose connected to STV`);
  });
  
  mongoose.connection.on("error", (err) => {
    console.log(err.message);
  });
  
  mongoose.connection.on("disconnected", () => {
    console.log("Mongoose connection is disconnected");
  });
  
  process.on("SIGINT", async () => {
    await mongoose.connection.close();
    process.exit(0);
  });