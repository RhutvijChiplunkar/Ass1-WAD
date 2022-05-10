const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var port = 3000
const Student =require('./models')

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dbConfig = require('./config');
const mongoose = require('mongoose');

//mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//Home page rendered
app.get('/', (req, res) => {
    res.render("index")
});

//Adding new student to the database
app.post('/addStudent',(req,res)=>{
    var data=new Student(req.body);
    data.save()
    .then(item=>{
        res.send("Item Saved successfully")
    })
    .catch(err => {
        res.status(400).send("unable to save to database");
    })
})

//count of documents
app.get('/getStudents',(req,res)=>{

    //count the documents
    var x=Student.estimatedDocumentCount();

    console.log(req.query)
    Student.find(req.query).
    then(student=>{
        res.render("table",{student:student})
    }).catch(err=>{
        res.json({ "message" : "err"})
    })
})


//get DSBDA marks>20
app.get('/getdsbda',async (req,res)=>{
    var y=await Student.find({"DSBSA_marks":{$gt:20}}).select("Name")
    res.json(y);
})


//get more than 25 marks in all subjects
app.get('/getmarks25',async (req,res)=>{
    var y=await Student.find({$and:[
        {"DSBSA_marks":{$gt:25}},
        {"WAD_marks":{$gt:25}},
        {"CC_marks":{$gt:25}},
        {"CNS_marks":{$gt:25}},
        {"AI_marks":{$gt:25}}
    ]})
    .select("Name")
    res.json(y);
})

//delete student by id
app.post('/deleteStudents/:id',(req,res)=>{
    Student.findByIdAndDelete(req.params.id).
    then(student=>{
        console.log("Deleted Successfully")
        res.redirect('/getStudents')
    })
}) 

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
