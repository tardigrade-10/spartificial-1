const express= require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const Projects=require('../models/projects')
const Users=require('../models/users')
const authenticate=require('../authenticate')

const projectRouter=express.Router()

projectRouter.route('/').all((req,res,next)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','text/plain')
  next()
})

.get((req,res,next)=>{
  Projects.find({}).then(projects=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(projects)
  },err=>next(err))
  .catch(err=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
  //console.log(req.body)
  const objectives=req.body.objectives.split('\n');
  const deliverables=req.body.deliverables.split('\n');
  const prerequisites=req.body.prerequisites.split('\n');
  req.body.objectives=objectives
  req.body.deliverables=deliverables
  req.body.prerequisites=prerequisites
  if(req.user){
    Projects.create(req.body).then(project=>{
      Users.findById(req.user._id).then(user=>{
        user.projects.push({project_id:project._id,title:project.title,description:project.description,image:project.image})
        user.save().then(user=>{
          res.statusCode=200;
          res.setHeader('Content-type','application/json');
          res.json(project)
          },err=>next(err))
          .catch(err=>next(err))
        },err=>next(err))
        .catch(err=>next(err))
    },err=>next(err))
    .catch(err=>next(err))
  }else{
    res.statusCode=401;
    res.setHeader('Content-type','application/json')
    res.json({message:"Login to add projects!"})
  }
})

projectRouter.route('/:project_id')
.get((req,res,next)=>{
  Projects.findById(req.params.project_id)
  .then((project)=>{
    res.statusCode=200;
    res.setHeader('Content-type','application/json')
    res.json(project)
  })
})
.put(authenticate.verifyUser,(req,res,next)=>{
  const objectives=req.body.objectives?req.body.objectives.split('\n'):null
  const deliverables=req.body.deliverables?req.body.deliverables.split('\n'):null
  const prerequisites=req.body.prerequisites?req.body.prerequisites.split('\n'):null
  
  if(objectives) req.body.objectives=objectives
  if(deliverables) req.body.deliverables=deliverables
  if(prerequisites) req.body.prerequisites=prerequisites

  if(req.user){
    Projects.findByIdAndUpdate(req.params.project_id,{$set:req.body},{new:true})
    .then((project)=>{
      res.statusCode=200;
      res.setHeader('Content-type','application/json')
      res.json(project)
      })
  }else{
    res.statusCode=401;
    res.setHeader('Content-type','application/json')
    res.json({message:"Only admin can update projects!"})
  }
})
.delete(authenticate.verifyUser,(req,res,next)=>{
  if(req.user){
    Projects.findByIdAndRemove(req.params.project_id).then(resp=>{
      res.statusCode=200;
      res.setHeader('Content-type','application/json')
      res.json({resp,message:"Deleted Successfully!"})
    })
  }else{
    res.statusCode=401;
    res.setHeader('Content-type','application/json')
    res.json({message:"Only admin can delete projects!"})
  }
})

projectRouter.route('/:project_id/instructors')
.post(authenticate.verifyUser,(req,res,next)=>{
  if(req.user){
    Projects.findById(req.params.project_id).then(project=>{
      project.instructors.push(req.body)
      project.save().then(project=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(project)
      },err=>next(err))
      .catch(err=>next(err))
    },err=>next(err))
    .catch(err=>next(err))
  }else{
    res.statusCode=401;
    res.setHeader('Content-type','application/json')
    res.json({message:"Only admin can add instructors!"})
  }
})

projectRouter.route('/:project_id/comments/:instructor_id')
.put(authenticate.verifyUser,(req,res,next)=>{
  Blogs.findById(req.params.project_id).then(project=>{
    if(project.instructors.id(req.params.instructor_id)!=null){
        if(req.body.name) project.instructors.id(req.params.instructor_id).name=req.body.name
        if(req.body.photo) project.instructors.id(req.params.instructor_id).rating=req.body.photo

      project.save().then(project=>{
        Projects.findById(project._id)
        .then(project=>{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(project); 
        })
      },err=>next(err))
    }
  },err=>next(err))
  .catch(err=>next(err))
})
.delete(authenticate.verifyUser,(req,res,next)=>{
  Projects.findById(req.params.project_id).then(project=>{
    if(project.instructors.id(req.params.instructor_id)!=null){
        project.instructors.id(req.params.instructor_id).remove()
      project.save().then(project=>{
        Projects.findById(project._id).then(project=>{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(project); 
        })
      },err=>next(err))
      .catch(err=>next(err))
    }
  },err=>next(err))
  .catch(err=>next(err))
})
module.exports=projectRouter