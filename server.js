'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
mongoose.connect(process.env.MONGO_URI);
const Schema = mongoose.Schema;
const dns = require('dns');

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}))
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

var urlSchema = new Schema({
  original_url: {type: String},
  short_url: {type: Number}
})

const URL = mongoose.model('URL', urlSchema);
  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
app.route('/api/shorturl/new').post((req,res)=>{
  dns.lookup(req.body,function(err,address,family){
    if (err){return {"error":"invalid URL"}}
    
  })
})



app.listen(port, function () {
  console.log('Node.js listening ...');
});