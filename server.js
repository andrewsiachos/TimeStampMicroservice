// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var bodyParser = require("body-parser");

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

//PROJECT CODE
app.get("/api/timestamp", function(req,res,next){
  var normalDate = new Date();
  normalDate = normalDate.toUTCString();
  var unixDate = new Date().getTime()/1000;
  res.json({"unix":unixDate, "utc":normalDate});
});

app.get("/api/timestamp/:dateVal", function(req,res,next){
  var theDate = req.params.dateVal;
  var normalDate;
  var unixDate;
  
  
  if(isNaN(theDate)){
    normalDate = new Date(theDate);
    normalDate = normalDate.toUTCString();
    unixDate = new Date(theDate).getTime()/1000;
    if(normalDate=="Invalid Date"){
      res.json({"error":"Invalid Date"});
    }else{
      res.json({"unix":unixDate,normal:normalDate});
    } 
  }else{
    unixDate = theDate;
    normalDate = new Date(theDate)*1000;
    normalDate = normalDate.toUTCString();
    res.json({"unix":unixDate,normal:normalDate});
  }
  
  
  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
