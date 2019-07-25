var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var express = require('express')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
var ObjectId = require('mongodb').ObjectID

var Schema = mongoose.Schema;
app.use(bodyParser.json());

var connection = mongoose.createConnection('mongodb://localhost:27017/mydb');
var newSchema = new Schema({
    inputrecruitmentId: String,
    inputPrimarySkills: String,
    inputSecondarySkills: String,
    revalantExperience: Number,
    revalantExperience: Number,
    experience: Number,
    vacancies: Number,
    jobDescription: String,
    department: String,
    qualification: String,
    reasonforRecurit: String,
    location: String,

});

var Recruiters = connection.model('recruiters', newSchema, 'recruiters');
exports.saveRecruiters = function (req, res) {
    console.log("req.body", req.body);
    var myData = new Recruiters(req.body);
    myData.save()
        .then(item => {
            res.send("item saved to database");
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });

}
exports.getRecruitList = function (req, res) {
    Recruiters.find({}, function (err, data) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(data);
        }
    });

}
//api for Delete data from database  
exports.removeList = function (req, res) {
    Recruiters.remove({ _id: req.body.id }, function (err) {
        if (err) {
            res.send(err);
        }
        else {
            res.send({ data: "Record has been Deleted..!!" });
        }
    });
}

exports.updateList = function (req, res) {
    Recruiters.update({_id:ObjectId(req.body.id)}, req.body,
        function (err,val) {
            console.log("val>?>>",val);
            if (err) {
                res.send(err);
                return;
            }
            res.send({ data: "Record has been Updated..!!" });
        });
}
exports.editdata = function (req, res) {
    Recruiters.find({ _id: req.query.user_id }, {},
        function (err, data) {
            console.log("edit data>>",data);
            if (err) {
                res.send(err);
                return;
            }
            res.send(data);
        });
}  

exports.getsamplelist = function (req, res) {
    Recruiters.find({},
        function (err, data) {
            console.log("edit data>>",data);
            if (err) {
                res.send(err);
                return;
            }
            res.send(data);
        });
}