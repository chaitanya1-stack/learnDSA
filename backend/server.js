const dotenv=require('dotenv');
const express=require('express');
const connectDB=require('./config/db');
const cors = require('cors');
const useRoutes = require('./routes/userRoutes');
const problemRoutes =require('./routes/problemRoutes')





// we will load environmwnt variables
dotenv.config();




const app =express(); // init express app

//middleware

app.use(cors());
app.use(express.json());  

//connect to the mongoDB
connectDB();


app.use('/api/users', useRoutes);

app.use('/api/problems',problemRoutes)


app.get('/',(req,res)=> {
    res.send('API is running');
});



//this will start the server
const PORT =process.env.PORT || 5050;
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);

});

