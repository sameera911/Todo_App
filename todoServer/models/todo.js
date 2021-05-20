const mongoose=require('../db');
var Todo=mongoose.model('Todo',{
    order:{type:Number},
    userName:{type:String},
    task:{type:String},
    status:{type:String}
});
module.exports={Todo};