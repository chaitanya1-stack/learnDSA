const dotenv=require('dotenv');
const express=require('express');
const connectDB=require('./config/db');
const cors = require('cors');



// we will load environmwnt variables
dotenv.config();


//connect to the mongoDB
connectDB();

const app =express(); // init express app

//middleware

app.use(cors());
app.use(express.json());  


app.get('/',(req,res)=> {
    res.send('API is running');
});



//this will start the server
const PORT =process.env.PORT || 5050;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);

});

