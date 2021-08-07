var passport = require('passport')
var LocalStartegy=require('passport-local').Strategy
var JWTStartegy=require('passport-jwt').Strategy
var GoogleStrategy=require('passport-google-oauth20').Strategy
const GOOGLE_CLIENT_ID="GOOGLE_CLIENT_ID"
const GOOGLE_CLIENT_SECRET="GOOGLE_CLIENT_SECRET"

var ExtractJWT = require('passport-jwt').ExtractJwt
var jwt=require('jsonwebtoken')
var User =require('./models/users')
var config = require('./config')

passport.use(new LocalStartegy(User.authenticate()))

passport.serializeUser((user,done)=>{
    done(null,user)
})
passport.deserializeUser((user,done)=>{
    done(null,user)
});

exports.getToken=function(user){
    return jwt.sign(user,config.secretKey,{expiresIn:3600*24*365})
}

var opts={}
opts.jwtFromRequest=ExtractJWT.fromAuthHeaderAsBearerToken()
opts.secretOrKey=config.secretKey

exports.jwtPassport=passport.use(new JWTStartegy(opts,(jwt_payload,done)=>{
    //console.log("JWT_payload: ", jwt_payload)
    User.findOne({_id:jwt_payload._id},(err,user)=>{
        if(err){
            //console.log("Error=err")
            return done(err,false)
        }else if(user){
            //console.log(user)
            return done(null,user);
        }
        else{
            //console.log("Error=sab khrab")
            return done(null,false)
        }
    })
}))

passport.use(new GoogleStrategy({
    clientID:GOOGLE_CLIENT_ID,
    clientSecret:GOOGLE_CLIENT_SECRET,
    callbackURL:"http://localhost:5000/api/user/google/callback"
},(accessToken,refreshToken,profile,done)=>{
    //console.log(profile)
    User.findOne({googleId:profile.id}).then((user)=>{
        if(user){
            //console.log('user is: ',user)
            done(null,user)
        }else{
            new User({username:profile._json.email.split('@')[0],googleId:profile.id,firstname:profile.name.givenName,lastname:profile.name.familyName,email:profile._json.email}).save().then(user=>{
                //console.log(user)
                done(null,user)
            })
        }
    })
}))

exports.verifyUser=passport.authenticate('jwt',{session:false})