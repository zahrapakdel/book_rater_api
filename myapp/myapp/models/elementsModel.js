/**
 * Created by Zahra on 26/12/2017.
 */
var mongoose=require('mongoose');
var schema=mongoose.Schema;

var elementSchema=new schema({
   color :{
       type:String,
       required:[true,'color field is required']
   },
    value:{
        type:String
    }
});

var element=mongoose.model('element',elementSchema);
module.exports=element;