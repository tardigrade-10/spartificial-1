var mongoose = require('mongoose')
var Schema=mongoose.Schema

var paymentSchema=new Schema({
  message:String,
  paymentId:String,
  orderId:String,
  amount:String,
  projectId:String,
  link:String
},{
  timestamps:true
})

module.exports=mongoose.model('Payment',paymentSchema)