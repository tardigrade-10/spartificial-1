var express = require('express');
const { NotExtended } = require('http-errors');
var teamsRouter = express.Router();
const Teams = require('../models/teams');
const authenticate=require('../authenticate')

teamsRouter.route('/')
.get((req,res,next)=>{
	Teams.find({}).then(teams=>{
		res.statusCode=200;
		res.setHeader('Content-Type','application/json')
		res.json(teams)
	},err=>next(err))
	.catch(err=>next(err))
})

.post(authenticate.verifyUser,(req,res,next)=>{
  //console.log(req.body)
    Teams.create(req.body).then(team=>{
      res.statusCode=200;
      res.setHeader('Content-type','application/json');
      res.json(team)
    },err=>next(err))
    .catch(err=>next(err))
})

teamsRouter.put('/:_id',authenticate.verifyUser, (req, res, next) => {
	Teams.findByIdAndUpdate(req.params._id,{$set:req.body},{new:true}).then((team)=>{
		res.statusCode=200;
		res.setHeader('Content-type','application/json')
		res.json(team);
	},(err)=>next(err))
	.catch((err)=>next(err))
});

teamsRouter.delete('/:_id',authenticate.verifyUser, (req, res, next) => {
	Teams.findByIdAndRemove(req.params._id).then((resp)=>{
		res.statusCode=200;
		res.setHeader('Content-type','application/json')
		res.json({success:true})
},(err)=>next(err))
.catch((err)=>next(err))
});

module.exports = teamsRouter;
