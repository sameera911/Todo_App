const mongoose=require('../db');
var User=mongoose.model('User',{
    fullName:{type:String},
    userName:{type:String},
    password:{type:String},
    gender:{type:String},
    dob:{type:Date},
    address:{type:String},
    phoneNo:{type:Number},
    email:{type:String}
});
module.exports={User}; 