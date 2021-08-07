var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors=require('cors')
var multer=require('multer')
var mongoose=require('mongoose')
var passport=require('passport')
var session=require('express-session')
var FileStore=require('session-file-store')(session)
var config=require('./config')

const Files=require('./models/files')
const fileRouter = express.Router();

var authenticate=require('./authenticate')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var paymentRouter= require('./routes/payments')
var blogRouter=require('./routes/blogs')
var teamsRouter=require('./routes/teams')
var involvedRouter=require('./routes/involved')
var projectRouter=require('./routes/projects')
var instructorRouter=require('./routes/instructor')

var app = express();

const storageEngine = multer.diskStorage ({
  destination: './public/uploads/',
  filename: function (req, file, callback) {
    callback (
      null,
      'FILE'+ Date.now () + path.extname (file.originalname)
    );
  },
});
const fileFilter = (req, file, callback) => {
  let pattern = /pdf/; // reqex

  if (pattern.test (path.extname (file.originalname))) {
    callback (null, true);
  } else {
    callback ('Error: not a valid file');
  }
};
const upload = multer ({
  storage: storageEngine,
  fileFilter  
});
fileRouter.post ('/upload', upload.single ('uploadedFile'), (req, res) => {
  //console.log(req.file)
  Files.create({filename:req.file.filename}).then((file)=>{
    res.json (req.file).status (200);
  })
});
fileRouter.get('/:name',(req,res)=>{
  res.sendFile(path.join(__dirname,'public','uploads',req.params.name))
})
fileRouter.get('/',authenticate.verifyUser,(req,res)=>{
  if(req.user.admin){
    Files.find({}).then(files=>{
      res.setHeader('Content-Type','application/json')
      res.statusCode=200
      res.json(files)
    })
  }else{
    res.json({message:"Unauthorized"}).status(401)
  }
})

mongoose.connect(config.mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(()=>{
  console.log('Connected to Database')
}).catch((err) => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(bodyParser({limit: '1mb'}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('12345-67890-09876-54321'));
app.use(express.static(path.join(__dirname, 'build')));

app.use(session({
  name:'session-id',
  secret:'12345-67890-09876-54321',
  saveUninitialized:false,
  resave:false,
  store:new FileStore(),
  maxAge:Date.now()+(30*86400*1000)
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/payments',paymentRouter)
app.use('/api/blogs',blogRouter)
app.use('/api/teams',teamsRouter)
app.use('/api/involved',involvedRouter)
app.use('/api/projects',projectRouter)
app.use('/api/files',fileRouter)
app.use('/api/instructor',instructorRouter)

app.get('*',(req,res)=>{res.sendFile(path.join(__dirname,'build','index.html'))})

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
