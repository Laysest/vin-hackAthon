var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();
app.use(cors());
// var port = process.env.PORT || 8080;
// app.listen(port);

var port = 8100;
app.listen(port);
console.log('Webservice started on port: ' + port);


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post('/test_api', function(req, res) {
    // console.log(`user_id: ${req.headers.user_id}`);
    // console.log(`devices_id: ${req.headers.device_id}`);
    // console.log(`scanner_version: ${req.headers.scanner_version}`);
    // console.log(`os_version: ${req.headers.os_version}`);
    // console.log(`timestamp: ${req.headers.timestamp}`);
    // console.log(`session: ${req.headers.session}`);

  console.log(req.body);
  fs.writeFile(`public/data_generated.json`, JSON.stringify(req.body.data), (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
  });
  
  // fs.open('public/data_generated.json', 'w', function (err, file) {
  //   if (err) throw err;
  //   console.log('Saved!');
  // });

  res.send("abc");
  
  // if (req.body.next && req.body.next == 'next_1'){
  //   res.sendFile('public/data_v4.json' , { root : __dirname});
  // }
  // else if (req.body.next && req.body.next == 'next_2'){
  //   res.sendFile('public/data_v5.json' , { root : __dirname});
  // }
  // res.sendFile('public/data_v2.json' , { root : __dirname});
});

app.get('/test_params/:formId', function(req, res) {
  console.log(req.params.formId)
  res.sendFile('public/data_2.json' , { root : __dirname});
});


app.get('/download', function(req, res) {
  res.sendFile('public/data_generated.json' , { root : __dirname});
});

app.get('/test_all', function(req, res) {
  res.sendFile('public/test_all.json' , { root : __dirname});
});


newFile = (formId) => {
  return {"data":{"link_form_ids":[],"form_id:":formId,"metadata":{"app_name":"Uni","app_id":123456,"title":"","submit_button":{"label":"Gửi thông tin","background_color":"#6666ff","cta":"request","url":`http://54.169.254.105/api/get_examples?form_id=${formId}`},"elements":[]}}}
}

LOCATION = './public/data/'

app.post('/create', function(req, res) {
  fs.writeFile(`${LOCATION}${req.body.formCode}.json`, JSON.stringify(newFile(req.body.formId)), function (err) {
    if (err) throw err;
    console.log(`Form ${req.body.formCode} is created successfully.`);
  }); 
  
  res.send("abc");
});

app.post('/update', function(req, res) {
  fs.writeFile(`${LOCATION}${req.body.formCode}.json`, JSON.stringify(req.body.formJson), function (err) {
    if (err) throw err;
    console.log(`Form ${req.body.formCode} is updated successfully.`);
  }); 
  
  res.send("abc");
});


app.get('/getFile/:formCode', function(req, res) {
  res.sendFile(`${LOCATION}${req.params.formCode}.json` , { root : __dirname});
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