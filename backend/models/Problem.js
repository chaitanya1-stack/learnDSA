const mongoose =require('mongoose');
const User = require('../models/User');

const problemSchema =new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId,
        ref: 'User', required:true
    },

    title: {type: String, required:true},

    topics: {type:[String]}, // store array


    rated: { type:String}, // for codeforces 

    platform: {type: String, required:true},

    link : {type: String},

     status : {type: [String], enum:['solved', 'unsolved', 'bookmark'],default:'unsolved'}, // store a  array

     date:{type:  Date, default:Date.now} // date problem was added




});





// Exports the model named 'user' (MongoDB will make it users collection).

module.exports = mongoose.model('Problem', problemSchema);
