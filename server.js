const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const request = require('request');
var app = express();
var port = process.env.PORT || 3000;
app.set(port, 'port');
const server = http.createServer(app);
server.listen(port);
app.use(express.static(__dirname + '/dist/weather-app'));
// app.get('/hi',(req,res)=>res.send('Hello World!'));

app.get('/autocomplete',function(req,res,next)
  {
    // console.log("got autocomplete request");
    var city = req.query.term;
    var gAutocomplete = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?input=' + city + '&types=(cities)&language=en&key=AIzaSyBdkKxF3je9Y_4iXQBSS9SvpWWbFNhhdOY';
    //console.log(gAutocomplete);
    request.get({
      url: gAutocomplete,
      json:true,
      headers:{'User-Agent':'request'}},
      (err,response,data)=> {
        if (err) {
          console.log('Error:', err);
        } else if (res.statusCode != 200) {
          console.log('Status:', res.statusCode);
        } else {
          res.setHeader('content-type', 'application/json');
          res.json(data);
        }
      }
    )
  });
  app.get('/getCoord',function(req,res,next){
    // console.log(req.query);
    // console.log(req.query.address);
    let gLocate = 'https://maps.googleapis.com/maps/api/geocode/json?address='+ req.query.address +'&key=AIzaSyBdkKxF3je9Y_4iXQBSS9SvpWWbFNhhdOY';
    request.get({
      url:gLocate,
      json:true,
      headers:{'User-Agent':'request'}},
    (err,response,data)=>{
        if (err) {
          console.log("Err: " + err);
        }
        else if (res.statusCode != 200){
          console.log('here')
          console.log('Status: ', res.statusCode);
        } else {
          res.setHeader('content-type','application/json');
          res.json(data);
        }
    }
    )
}
);
app.get('/getWeather',function(req,res,next){
  // console.log('here');
  let latLong = (req.query.latLong).split(',');
  let lat = latLong[0]; let lon = latLong[1];
  // console.log(lat + "; " + lon);
  let weatherUrl = 'https://api.darksky.net/forecast/c4f3e0448dd2c28968ec2813d8a54641/' + lat + ',' + lon;
  request.get({
    url: weatherUrl,
    json:true,
    headers:{'User-Agent':'request'}},
    (err,response,data)=>{
      if (err) {
        console.log("Err: " + err);
      }
      else if (res.statusCode != 200){
        console.log('here');
        console.log('Status: ', res.statusCode);
      } else {
        res.setHeader('content-type', 'application/json');
        res.json(data);
      }
  })
});

app.get('/getCustom',function(req,res,next){
  let state = req.query.qq;
  let imagelink = 'https://www.googleapis.com/customsearch/v1?q=' + state + '%20State%20Seal&cx=010635253428502120430:wfsccirndy8&imgSize=huge&imgType=news&num=1&searchType=image&key=AIzaSyBdkKxF3je9Y_4iXQBSS9SvpWWbFNhhdOY';
  request.get({
      url: imagelink,
      json:true,
      headers:{'User-Agent':'request'}},
    (err,response,data)=>{
      if (err) {
        console.log("Err: " + err);
      }
      else if (res.statusCode != 200){
        console.log('here');
        console.log('Status: ', res.statusCode);
      } else {
        res.setHeader('content-type', 'application/json');
        res.json(data);
      }
    })
});

app.get('/getDaily',function(req,res){
  let toSend = req.query.toSend;
  let urlLink = 'https://api.darksky.net/forecast/c4f3e0448dd2c28968ec2813d8a54641/' + toSend;
  request.get({
      url: urlLink,
      json:true,
      headers:{'User-Agent':'request'}},
    (err,response,data)=>{
      if (err) {
        console.log("Err: " + err);
      }
      else if (res.statusCode != 200){
        // console.log('here');
        // console.log('Status: ', res.statusCode);
      } else {
        res.setHeader('content-type', 'application/json');
        res.json(data);
      }
    })


});




//app.get('/', (req, res) => {res.sendFile(path.join(__dirname, 'dist/weather-app/index.html'));
//module.exports = app;*/
