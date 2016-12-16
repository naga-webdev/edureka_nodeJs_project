var express = require('express');
var bp = require('body-parser');
var mongo = require("mongojs");

var db = mongo("edureka", ["employees"]);  // edureka db, employees collection

var app = express();

app.use(bp.json());
app.use(express.static(__dirname));

app.get('/employees', function (req, res) {
    console.log("fetching employees list from db");

    db.employees.find(function (err, docs) {
        if (err) console.log("error while fetching employees list from db");
        else res.send(docs);
    });
});

app.post('/employee', function (req, res) {
    console.log("adding employee to db");

    db.employees.insert(req.body, function (err, docs) {
        if (err) console.log("error while adding employee to db");
        else res.json(docs);
    });
});

app.delete('/employee/:id', function (req, res) {
    console.log("removing employee record from db");

    var id = req.params.id;
    db.employees.remove({ _id: mongo.ObjectId(id) }, function (err, docs) {
        if (err) console.log("error while removing employee from db");
        else res.json(docs);
    });
});

app.put('/employee/:id', function (req, res) {
    console.log("updating employee record in db");

    var id = req.params.id;
    db.employees.findAndModify({
        query: { _id: mongo.ObjectId(id) },
        update: {
            $set: {
                name: req.body.name,
                email: req.body.email,
                age: req.body.age,
                dob: req.body.dob,
                gender: req.body.gender,
                department: req.body.department,
            }
        },
        new: true
    }, function (err, doc) {
        res.send(doc);
    });
});

app.listen(3000, function () {
    console.log("server running at 3000");
});