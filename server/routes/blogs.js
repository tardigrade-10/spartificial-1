const express= require('express')
const bodyParser=require('body-parser')
const mongoose=require('mongoose')

const Blogs=require('../models/blogs')
const authenticate=require('../authenticate')

const blogRouter=express.Router()

blogRouter.route('/').all((req,res,next)=>{
  res.statusCode=200;
  res.setHeader('Content-Type','text/plain')
  next()
})

.get((req,res,next)=>{
  Blogs.find({}).then(blogs=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(blogs)
  },err=>next(err))
  .catch(err=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
  //console.log(req.body)
  if(req.user){
    req.body.username=req.user.username
    req.body.author=req.user.personal.firstname+" "+req.user.personal.lastname;
    req.body.about=req.user.personal.about;
    req.body.profilePic=req.user.personal.img;
    Blogs.create(req.body).then(blog=>{
      res.statusCode=200;
      res.setHeader('Content-type','application/json');
      res.json(blog)
    },err=>next(err))
    .catch(err=>next(err))
  }
})

blogRouter.route('/:blogId')
.get((req,res,next)=>{
  Blogs.findById(req.params.blogId).then(blog=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json(blog);
  },err=>next(err))
  .catch(err=>next(err))
})
.put(authenticate.verifyUser,(req,res,next)=>{
  if(req.user){
    Blogs.findById(req.params.blogId).then(blog=>{
      if(blog.username===req.user.username||req.user.admin){
        if(req.body.image) blog.image=req.body.image
        if(req.body.category) blog.category=req.body.category
        if(req.body.title) blog.title=req.body.title
        if(req.body.description) blog.description=req.body.description
        
        blog.profilePic=req.user.personal.img
        blog.about=req.user.personal.about
        blog.author=req.user.personal.firstname+" "+req.user.personal.lastname
        blog.username=req.user.username
        blog.save().then(blog=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json')
          res.json(blog)
        },err=>next(err))
        .catch(err=>next(err))
      }else{
        res.statusCode=401;
        res.setHeader('Content-Type','application/json')
        res.json({message:"Not Allowed!"})
    }
    },err=>next(err))
    .catch(err=>next(err))
  }
})
.delete(authenticate.verifyUser,(req,res,next)=>{
  if(req.user){
    Blogs.findById(req.params.blogId).then(blog=>{
      if(blog.username===req.user.username||req.user.admin){
        blog.delete().then(()=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json')
          res.json({message:"Success"})
        },err=>next(err))
        .catch(err=>next(err))
      }else{
        res.statusCode=401;
        res.setHeader('Content-Type','application/json')
        res.json({message:"Not Allowed!"})
      }
    },err=>next(err))
    .catch(err=>next(err))
  }
})

blogRouter.route('/:blogId/comments')
.get((req,res,next)=>{
  Blogs.findById(req.params.blogId).then(blog=>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(blog.comments)
  },err=>next(err))
  .catch(err=>next(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
  if(req.user){
    req.body.author=req.user.personal.firstname+" "+req.user.personal.lastname
    req.body.username=req.user.username;
    Blogs.findById(req.params.blogId).then(blog=>{
      blog.comments.push(req.body)
      blog.save().then(blog=>{
        res.statusCode=200;
        res.setHeader('Content-Type','application/json')
        res.json(blog)
      },err=>next(err))
      .catch(err=>next(err))
    },err=>next(err))
    .catch(err=>next(err))
  }
})

blogRouter.route('/:blogId/comments/:commentId')
.put(authenticate.verifyUser,(req,res,next)=>{
  Blogs.findById(req.params.blogId).then(blog=>{
    if(blog.comments.id(req.params.commentId)!=null){
      if(blog.comments.id(req.params.commentId).username===req.user.username||req.user.admin){
        if(req.body.comment) blog.comments.id(req.params.commentId).comment=req.body.comment
        if(req.body.rating) blog.comments.id(req.params.commentId).rating=req.body.rating

        blog.author=req.user.personal.firstname+" "+req.user.personal.lastname
        blog.username=req.user.username
      }else{
        err = new Error('Cannot edit this comment');
        err.status = 403;
        return next(err);
      }
      blog.save().then(blog=>{
        Blogs.findById(blog._id)
        .then(blog=>{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(blog); 
        })
      },err=>next(err))
    }
  },err=>next(err))
  .catch(err=>next(err))
})
.delete(authenticate.verifyUser,(req,res,next)=>{
  Blogs.findById(req.params.blogId).then(blog=>{
    if(blog.comments.id(req.params.commentId)!=null){
      if(blog.comments.id(req.params.commentId).username===req.user.username||req.user.admin){
        blog.comments.id(req.params.commentId).remove()
      }else{
        err = new Error('Cannot delete this comment');
        err.status = 400;
        return next(err);
      }
      blog.save().then(blog=>{
        Blogs.findById(blog._id).then(blog=>{
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(blog); 
        })
      },err=>next(err))
      .catch(err=>next(err))
    }
  },err=>next(err))
  .catch(err=>next(err))
})
module.exports=blogRouter