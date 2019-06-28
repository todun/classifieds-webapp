require('dotenv').config();
//process.env.DB_TYPE

const db = require('./db');

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/create', function(req, res, next) {
  db.add.create(req.body.add, { attributes: db.add_fillable })
    .then(add => res.json(add))
    .catch(error => {
      console.log(error);
      res.status(400).json(error);
    });
});

app.get('/adds', function(req, res, next) {
  var page = req.query.page ? req.query.page : 1; 
  var perPage = 12;
  db.add.findAll({ /*attributes: db.add_fillable,*/ order: [['id', 'desc']], limit: perPage , offset: (page - 1) * perPage}).then(result => {
    res.status(200).json(result);
  });
});

app.get('/add/:id', function(req, res, next) {
  var id = req.params.id; 
  db.add.findByPk(id).then(result => {
    res.status(200).json(result);
  });
});

app.get('/seedadds', function(req, res, next) {
  var start = new Date();

  var w1 = ['buying', 'selling', 'giving away'];
  var w2 = ['antique', 'mid century', 'iron', 'persian', 'vintage', 'old school', 'plastic', 'japanese', 
  'western', 'brand new', 'old', 'giant', 'small', 'portable'];
  var w3 = ['mirror', 'drawer', 'table', 'book stand', 'car', 'laptop', 'chest', 'chair', 'rug', 'coach'];
  var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum";
  var la = lorem.split(" ");

  function rand(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function rand_arr(arr) {
    return arr[rand(arr.length)];
  }
  var data = {email: 'aaa@tempmail.lv'};
  var promises = [];
  for(var i = 0; i < 1000; i++) {
    data.title = [rand_arr(w1),rand_arr(w2),rand_arr(w2),rand_arr(w3)].join(" ");
    data.text = [rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),
    rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),
    rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la),rand_arr(la)].join(" ");
    promises.push(db.add.create(data));
  }

  Promise.all(promises).then(function(values) {
    var dif = new Date() - start;
    res.status(200).json({'records created': promises.length, 'time elapsed (seconds)': dif/1000});
  });
});

app.delete('/adds/:id', function(req, res, next) {
  var id = req.params.id; 
  db.add.destroy({
    where: {
      id: id
    }
  }).then(result => {
    res.status(200).json(result);
  });
});

app.get('/*', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// catch 404 and forward to error handler
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
