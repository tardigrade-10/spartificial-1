var express = require('express');
const { NotExtended } = require('http-errors');
var involvedRouter = express.Router();
const Involved = require('../models/involved');

involvedRouter.route('/')
.get((req,res,next)=>{
	Involved.find({}).then(involved=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json')
		res.json(involved)
	},err=>next(err))
	.catch(err=>next(err))
})

.post((req,res,next)=>{
  //console.log(req.body)
    Involved.create(req.body).then(invloved=>{
      res.statusCode=200;
      res.setHeader('Content-type','application/json');
      res.json(invloved)
    },err=>next(err))
    .catch(err=>next(err))
})

module.exports = involvedRouter;
