const mongoose=require('mongoose')
const Schema=mongoose.Schema;

var instructorSchema=new Schema({
  name:{
    type:String,
    required:true
  },
  photo:{
    type:String,
    required:true
  }
},{timestamps:true})

var projectSchema=new Schema({
  image:{
    type:String,
    default:'https://www.kindpng.com/picc/m/399-3992452_project-management-insights-and-data-and-insights-icon.png'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  start_date:{
    type:Date,
    required:true
  },
  duration:{
    type:String,
    required:true
  },
  prerequisites:{
    type:[String],
    default:["None"]
  },
  objectives:{
    type:[String],
    default:["None"]
  },
  deliverables:{
    type:[String],
    default:["None"]
  },
  fees:{
    type:Object,
    required:true
  },
  instructors:[instructorSchema],
  referal:[Object]
},{
  timestamps:true
})

module.exports=mongoose.model('Project',projectSchema)