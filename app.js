var express = require('express')
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');
var https = require('https');

app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname + '/')));
app.use('/root', express.static(path.join(__dirname + '/root')));
app.use('/root/index.html', express.static(path.join(__dirname + '/root/index.html')));
app.use(bodyParser.urlencoded({ extended: true }));
var session = require('client-sessions');
var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var connection = mongoose.createConnection('mongodb://localhost:27017/mydb');
var routes=require('./route.js');
console.log("save recruits",routes);
var newSchema = new Schema({
    email: String,
    password: String
});
app.use(session({
    cookieName: 'session',
    secret: 'random_string_goes_here',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  }));
var User = connection.model('users', newSchema, 'users');

//post
app.post('/saveRecruiters',routes.saveRecruiters);
app.post('/removeList',routes.removeList); 
app.post('/removeList',routes.updateList); 
app.post('/updateList',routes.updateList);

app.get('/getsamplelist',routes.getsamplelist);

//get
app.get('/getRecruitList',routes.getRecruitList); 
app.get('/editdata',routes.editdata);  
const dialogflow = require('dialogflow');



app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "/root" + "/index.html");
    // res.send("hello");
})
app.post('/login', function (req, res) {
    User.findOne({ 'email': req.body.email, 'password': req.body.password }, function (err, user) {
        console.log("user", user);
        if (user) {
            console.log("login success");
            req.session.user = user;
            
            res.send({ message: 'login success', status: "success" });
        } else {
            res.send({ message: 'login fail', status: "failure" });


        }
    })


})
app.get('/logout', function(req, res) {
    console.log("logout",req.session);
    req.session.reset();
    console.log("logout>>>>>",req.session);
    res.redirect('success');
  });
var server = app.listen(7070, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening listening at http://%s:%s', host, port);
})
