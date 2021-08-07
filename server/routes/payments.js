const express= require('express');
const Razorpay=require('razorpay');
const config=require('../config');
var crypto=require('crypto')
const router=express.Router();

const Payments = require('../models/payments');
const { nextTick } = require('process');
const authenticate = require('../authenticate');
const Users = require('../models/users');
const { create } = require('domain');

router.get("/all",authenticate.verifyUser,(req,res,next)=>{
    if(req.user.admin){
        Payments.find({}).then(payments=>{
            res.setHeader('Content-Type','application/json')
            res.statusCode=200;
            res.json(payments)
        }).catch((err)=>next(err));
    }else{
        res.json({message:"Unauthorized"}).status(401)
    }
})
router.post("/orders",authenticate.verifyUser, async (req, res) => {
    //console.log('called')
    //console.log(req.body)
    const link=`https://spartificial.herokuapp.com/projects/${req.body.link}`
    var valid=false;
    if(req.body.link){
        Users.findById(req.body.userId).then(user=>{
            user.referalStudent.filter(val=>{
                if(val===link){
                    valid=true
                }
            })
            user.referalInstructor.filter(val=>{
                if(val===link){
                    valid=true
                }
            })     
        }).then(()=>{
            if(valid) createOrder(req.body.amount,req.body.reciept,res)
            else {
                res.status(403).json("Referal Link Invalid!")
            }
        })
    }else{
        createOrder(req.body.amount,req.body.reciept,res)
    }
});
const createOrder=async(amount,reciept,res)=>{
    try {
        const instance = new Razorpay({
            key_id: config.razorpay.KEY_ID,
            key_secret: config.razorpay.KEY_SECRET,
        });
        //console.log(req.body)
        const options = {
            amount: amount, // amount in smallest currency unit
            currency: "INR",
            receipt: reciept,
        };
  
        const order = await instance.orders.create(options);
  
        if (!order) return res.status(500).send("Some error occured");
  
        res.json(order);
    } catch (error) {
        res.status(500).send(error);
    }
}
router.post("/success",authenticate.verifyUser, async (req, res, next) => {
    //console.log(req.body)
  try {
      const {
          orderCreationId,
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
          amount,
          projectId,
          title,
          description,
          image,
          link
      } = req.body;
      const shasum = crypto.createHmac("sha256", config.razorpay.KEY_SECRET);

      shasum.update(`${orderCreationId}|${razorpayPaymentId}`);

      const digest = shasum.digest("hex");

      if (digest !== razorpaySignature)
          return res.status(400).json({ msg: "Transaction not legit!" });
      const payment=new Payments({message:"Succcessful payment",orderId:razorpayOrderId,paymentId:razorpayPaymentId,amount:amount,projectId:projectId,link:link})
      payment.save().then((payment)=>{
        if(payment){
          Users.findById(req.user._id).then(user=>{
              //console.log(payment)
              user.payments.push({payment_id:payment.paymentId,project_id:payment.projectId,title:title,description:description,image:image,link:link})
              user.save();
              res.json(payment)
          })
        }
      },err=>next(err))
  } catch (error) {
      res.status(500).send(error);
  }
});
module.exports = router;