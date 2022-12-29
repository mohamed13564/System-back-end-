var mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  Username: {type: String, required:true , unique:true},
  email: {type:String, required:true , unique:true},
  password:{type:String, required:true , unique:true},
  isAdmin:{type: Boolean , default: false},
           
    // name: String,
    // password: String,
    // email: String,
    // token: String
  },
  {timestamps :true}
  );
  
  
module.exports = mongoose.model('user', UserSchema);