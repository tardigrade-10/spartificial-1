const mongoose = require('mongoose')
const passportLocalMongoose=require('passport-local-mongoose')
const Schema=mongoose.Schema;

var projectSchema=new Schema({
    project_id:{
        type:String,
        required:true
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
    }
},{
    timestamps:true
})

var paymentSchema=new Schema({
    payment_id:{
        type:String,
        required:true
    },
    project_id:{
        type:String,
        required:true
    },
    link:String,
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
    }
},{
    timestamps:true
})


var personalDetails=new Schema({
    firstname:{
        type:String,
        default:''
    },
    lastname:{
        type:String,
        default:''
    },
    email:{
        type:String,
        default:''
    },
    phone:{
        type:String,
        default:''
    },
    gender:{
        type:String,
        default:''
    },
    dob:{
        type:String,
        default:''
    },
    about:{
        type:String,
        default:''
    },
    education:{
        type:String,
        default:''
    },
    address:{
        type:String,
        default:''
    },
    img:{
        type:String,
        default:'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
    }
},{
    timestamps:true
})
var  userSchema = new  Schema({
    admin:{
        type:Boolean,
        default:false
    },
    mentor:{
      type:Boolean,
      default:false
    },
    personal:personalDetails,
    projects:[projectSchema],
    payments:[paymentSchema],
    referalStudent:[String],
    referalInstructor:[String]

},{
    timestamps:true
});
userSchema.plugin(passportLocalMongoose);
module.exports=mongoose.model('User',userSchema)