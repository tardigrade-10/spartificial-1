const mongoose =require('mongoose')

const Schema=mongoose.Schema

const teamSchema=new Schema({
  image:{
    type:String,
    required:true
  },
  name:{
    type:String,
    required:true
  },
  designation:{
    type:String,
    required:true
  },
  category:{
    type:String,
    required:true
  },
  about:{
    type:String,
    default:''
  },
  email:String,
  phone:String,
  facebook:String,
  instagram:String
},{
  timestamps:true
})

var Teams=mongoose.model('Team',teamSchema);
module.exports=Teams;