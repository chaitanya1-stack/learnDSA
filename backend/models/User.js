const mongoose =require('mongoose');
const bcrypt =require('bcryptjs');

// useSchema is a mongoose model with password hashing using bcryptjs 
//  hash passwords securely before storing them in the database.

const userSchema =new mongoose.Schema({
    username: {type:String,required:true,unique:true},
    email: {type:String,required:true,unique:true},
    password: {type:String,required:true}
}); //the structure of the documents (records) that will be stored in the users collection.



//This is a Mongoose middleware that runs before saving a document.
//pre process before save.
userSchema.pre('save',async function (next) {
    if(!this.isModified('password'))  // If the password field hasn't been changed (e.g., during profile updates), skip hashing and move to the next middleware.
        return next();
     this.password=await bcrypt.hash(this.password, 10); //If the password field hasn't been changed (e.g., during profile updates), skip hashing and move to the next middleware.
     // 10 is salt round ( higher no. more secure ,but slower)
    
});

// Exports the model named 'User' (MongoDB will make it users collection).
module.exports = mongoose.model('User', userSchema);
