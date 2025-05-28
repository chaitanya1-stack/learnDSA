const mongoose = require('mongoose');
const connectDB =async () =>{

    try{
        console.log("MONGO_URI is:", process.env.MONGO_URI); //confirms .env running or not
        await
        

        mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true
        });

        console.log('MongoDBb connected');

    }

    catch(err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1); //exit app
    }
};
module.exports=connectDB;
