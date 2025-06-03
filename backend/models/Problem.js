const mongoose =require('mongoose'); // Imports Mongoose, the ODM (Object Data Modeling) library for MongoDB.
const User = require('../models/User');

const problemSchema =new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,  //Stores a reference to a User document (via ObjectId).
        ref: 'User',   //Tells Mongoose to populate this with data from the User model when needed.
        required:true 
    },

    title: {type: String, required:true},

    topics: {type:[String]}, // store array

    rated: { type:String}, // for codeforces 

    platform: {type: String, required:true},

    link : {type: String},

    status : {type: [String], enum:['solved', 'unsolved', 'bookmark'],default:'unsolved'}, // store a  array

    date:{type:  Date, default:Date.now} // date problem was added




});


// Exports the model named 'Problem' (MongoDB will make it users collection).

module.exports = mongoose.model('Problem', problemSchema);
