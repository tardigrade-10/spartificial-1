var mongoose = require('mongoose')
var Schema=mongoose.Schema

var involvedSchema=new Schema({
  isResolved:{
    type:Boolean,
    default:false
  },
  organisation:{
    type:String,
    default:""
  },
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  phone:{
    type:String,
    required:true
  },
  type:{
    type:String,
    required:true
  },
  proposal:{
    type:String,
    required:true
  }
},{
  timestamps:true
})

module.exports=mongoose.model('Involved',involvedSchema)