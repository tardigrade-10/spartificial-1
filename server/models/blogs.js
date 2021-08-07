const mongoose=require('mongoose')
const Schema=mongoose.Schema;

var CommentSchema=new Schema({
  author:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  comment:{
    type:String,
    required:true
  },
  rating:{
    type:Number,
    min:1,
    max:5,
    required:true
  }
},{
  timestamps:true
})

var BlogSchema=new Schema({
  category:{
    type:String,
    default:'Other'
  },
  title:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String,
    required:true
  },
  author:{
    type:String,
    required:true
  },
  username:{
    type:String,
    required:true
  },
  about:{
    type:String,
    default:''
  },
  profilePic:{
    type:String,
    default:'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'
  },
  comments:[CommentSchema]
},{timestamps:true})

var Blogs=mongoose.model('Blog',BlogSchema);
module.exports=Blogs;