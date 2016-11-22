// server.js

// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var http           = require('http');
var methodOverride = require('method-override');
var mongoose       = require('mongoose');
var multer         = require('multer');
var xlstojson      = require("xls-to-json-lc");
var xlsxtojson     = require("xlsx-to-json-lc");
var fs             = require('fs');

// configuration ===========================================

// config files
var db = require('./config/db');

// set our port
var port = process.env.PORT || 8080;

// connect to our mongoDB database
// (uncomment after you enter in your own credentials in config/db.js)
mongoose.connect(db.url);

// get all data/stuff of the body (POST) parameters
// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override'));

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public'));

// routes ==================================================
require('./app/routes')(app); // configure our routes

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
});
var upload = multer({ //multer settings
                storage: storage,
                fileFilter : function(req, file, callback) { //file filter
                    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1) {
                        return callback(new Error('Wrong extension type'));
                    }
                    callback(null, true);
                }
            }).single('file');

app.post('/upload', function(req, res) {
  var exceltojson;
  upload(req,res,function(err){
      var tempPath = './uploads/upload.json';
      fs.exists(tempPath, function(exists) {
        if(exists) {
          fs.unlink(tempPath);
        } else {
        }
      });
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
      /** Multer gives us file info in req.file object */
      if(!req.file){
          res.json({error_code:1,err_desc:"No file passed"});
          return;
      }
      /** Check the extension of the incoming file and
       *  use the appropriate module
       */
      if(req.file.originalname.split('.')[req.file.originalname.split('.').length-1] === 'xlsx'){
          exceltojson = xlsxtojson;
      } else {
          exceltojson = xlstojson;
      }
      try {
          exceltojson({
              input: req.file.path,
              output: './uploads/upload.json', //since we don't need output.json
              lowerCaseHeaders:true
          }, function(err,result){
              if(err) {
                  return res.json({error_code:1,err_desc:err, data: null});
              }
              res.json(result.address);
          });
      } catch (e){
          res.json({error_code:1,err_desc:"Corrupted excel file"});
      }
      //This will remove the file in uploads after it is complete
      try {
        fs.unlinkSync(req.file.path);
      } catch(e) {
          //error deleting the file
      }
  })
  var obj = fs.readFileSync('uploads/upload.json');
  var jsonContent = JSON.parse(obj);
  var request = require('request');
  for (var i=0;i<jsonContent.length;i++) {
        // http.post('http://localhost:8080/api/routes/', {'address' : (jsonContent[i].address)});
        request.post(
            'http://localhost:8080/api/routes/',
            { json: { address: jsonContent[i].address } },
            function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body)
                }
            }
        );
  }
  res.redirect('/routes');
});

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user
console.log('Magic happens on port ' + port);

// expose app
exports = module.exports = app;
