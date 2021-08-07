var express = require('express');
var router = express.Router();
var passport=require('passport')
const bodyParser=require('body-parser')

const SendOtp=require('sendotp')
const sendOtp=new SendOtp('msg91_apikey')

const Users=require('../models/users')
const authenticate=require('../authenticate')
/* GET users listing. */

router.use(bodyParser.json())

//***********username password signup**************
router.get('/all',authenticate.verifyUser,(req,res,next)=>{
  //console.log(req.user)
  if(req.user.admin){
    Users.find({}).then((users)=>{
      res.setHeader('Content-Type','application/json')
      res.statusCode=200;
      res.json(users)
    }).catch((err)=>next(err))
  }else{
    res.json("Permission Denied").status(401)
  }
})

router.get('/',authenticate.verifyUser,(req,res,next)=>{
  //console.log(req.user)
  Users.findById(req.user._id).then((user)=>{
    res.setHeader('Content-Type','application/json')
    res.statusCode=200;
    res.json(user)
  }).catch((err)=>next(err))
})

router.post('/signup',(req,res,next)=>{
  Users.register(new Users({username:req.body.username}),req.body.password,(err,user)=>{
    if(err){
      res.statusCode=500
      res.setHeader('Content-Type','application/json')
      res.json(err)
    }else{
      passport.authenticate('local')(req,res,()=>{
        var token= authenticate.getToken({_id:req.user._id})
        //console.log(req.user)
        Users.findById(req.user._id).then(user=>{
          user.personal=req.body
          user.save().then(user=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json')
            res.json({success:true,admin:req.user.admin,token:token,status:'Registration Successful'})
          }).catch(err=>next(err))
        }).catch(err=>next(err))
      })
    }
  })
})

// router.post('/login',passport.authenticate('local',{failureMessage:'Invalid Password'}),(req,res,next)=>{
//   var token= authenticate.getToken({_id:req.user._id})
//   res.statusCode=200;
//   res.setHeader('Content-Type','application/json')
//   res.json({success:true,token:token,user:req.user,status:'Logged in Successfully'})
// })

router.post('/login',passport.authenticate('local',{failureMessage:'Invalid Password',failWithError:true}),(req,res,next)=>{
  var token= authenticate.getToken({_id:req.user._id})
  res.statusCode=200;
  res.setHeader('Content-Type','application/json')
  res.json({success:true,admin:req.user.admin,token:token,status:'Logged in Successfully'})
},(err,req,res,next)=>{
  if(err.name==="AuthenticationError"){
    res.statusCode=401
    err.message="Inavlid Username or Password!"
    res.setHeader('Content-Type','application/json')
    //console.log(err)
    res.json(err)
  }else{
    res.statusCode=500
    err.message="Something went wrong!"
    res.setHeader('Content-Type','application/json')
    //console.log(err)
    res.json(err)
  }
})

router.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id')
    res.statusCode=200;
    //res.redirect('/')
     res.json({success:true})
  }else{
    var err=new Error('Not Logged in!');
    err.status=403
    next(err)
  }
})

router.post('/changepassword',authenticate.verifyUser,(req, res)=> {

  Users.findOne({ _id: req.user._id },(err, user) => {
    //console.log(req.body)
    // Check if error connecting
    if (err) {
      res.statusCode=404
      res.setHeader('Content-Type','application/json')
      res.json({ success: false, message: err }); // Return error
    } else {
      // Check if user was found in database
      if (!user) {
        res.statusCode=403
        res.setHeader('Content-Type','application/json')  
        res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
      } else {
        user.changePassword(req.body.currentpassword, req.body.newpassword, function(err) {
           if(err) {
                    if(err.name === 'IncorrectPasswordError'){
                        res.statusCode=403
                        res.setHeader('Content-Type','application/json')                
                        res.json({ success: false, message: 'Incorrect password' }); // Return error
                    }else {
                        res.statusCode=500
                        res.setHeader('Content-Type','application/json')
                        res.json({ success: false, message: 'Something went wrong!! Please try again after sometimes.' });
                    }
          } else {
            res.statusCode=200
            res.setHeader('Content-Type','application/json')      
            res.json({ success: true, message: 'Your password has been changed successfully' });
           }
         })
      }
    }
  });   
});

router.post('/forgetpassword',(req,res,next)=>{
  if(req.body.phone){
    Users.findOne({phone:req.body.phone}).then((user)=>{
      if(!user){
        res.json({success:false,message:"User not found"})
      }else{
        sendOtp.send(req.body.phone,'senderID',(err,data)=>{
          if(err) return res.json({success:false,err})
          data.type==="success"?res.json({success:true,messsage:"OTP sent successfully!"})
          :res.json({success:false,message:"Something went wrong."})
        })
      }
    })
  }
})
router.post('/setpassword',(req,res,next)=>{
  sendOtp.verify(req.body.phone,req.body.otp,(err,data)=>{
    if(err) return res.json({success:false,message:"Password setting unsuccessful!",err})
    Users.findOne({phone:req.body.phone}).then((user)=>{
      if(!user) return res.json({success:false,message:"User not found"})
      user.setPassword(req.body.newpassword,(err)=>{
        //console.log("changing")
        if(err) res.json({success:false,message:"Something Went wrong",err})
        user.save()
        res.json({success:true,message:"Password changed successfully!"})
      })
    })
  })
})

router.put('/:_id',authenticate.verifyUser,(req,res,next)=>{
  // console.log(req.user)
  //console.log(req.body.referal)
  Users.findById(req.params._id).then((user)=>{
    
    if(req.body.firstname) user.personal.firstname=req.body.firstname
    if(req.body.lastname) user.personal.lastname=req.body.lastname
    if(req.body.phone) user.personal.phone=req.body.phone
    if(req.body.firstname) user.personal.firstname=req.body.firstname
    if(req.body.gender) user.personal.gender=req.body.gender
    if(req.body.dob) user.personal.dob=req.body.dob
    if(req.body.about) user.personal.about=req.body.about
    if(req.body.education) user.personal.education=req.body.education
    if(req.body.address) user.personal.address=req.body.address
    if(req.body.img) user.personal.img=req.body.img
    if(req.body.referalStudent) user.referalStudent.push(req.body.referalStudent)
    if(req.body.referalInstructor) user.referalInstructor.push(req.body.referalInstructor)
    user.save().then(user=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json')
      res.json({ success: true, message: 'Updated Successfully!' })
    })
    },(err)=>next(err))
  .catch((err)=>next(err))
})
router.delete('/:id/referral-student',authenticate.verifyUser,(req,res,next)=>{
  Users.findById(req.params.id).then((user)=>{
    user.referalStudent.pop();
    user.save().then(user=>{
      res.statusCode=200;
      res.json({success:true,message:"Deleted referal ink"})
    })
  },err=>next(err))
  .catch(err=>next(err));
})
router.delete('/:id/referral-instructor',authenticate.verifyUser,(req,res,next)=>{
  Users.findById(req.params.id).then((user)=>{
    user.referalInstructor.pop();
    user.save().then(user=>{
      res.statusCode=200;
      res.json({success:true,message:"Deleted referal ink"})
    })
  },err=>next(err))
  .catch(err=>next(err));
})
module.exports = router;