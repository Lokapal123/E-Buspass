/* const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');

// Mongoose code
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ebus');
var db=mongoose.connection;
db.on('error', console.log.bind(console, "connection error"));
db.once('open', function(callback){
    console.log("connection succeeded");
})

// Mongoose db end 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})


app.get("/home", (req,res)=>{
    res.sendFile(__dirname+"/index.html")
})

app.get("/about", (req,res)=>{
    res.sendFile(__dirname+"/about.html")
})

app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/register.html")
})

app.get("/student",(req,res)=>{
    res.sendFile(__dirname+"/student.html")
})

app.get("/driver",(req,res)=>{
    res.sendFile(__dirname+"/driver.html")
})

app.get("/administratorData",(req,res)=>{
    res.sendFile(__dirname+"/administratorData.html")
})

app.get("/login",(req,res)=>{
    res.sendFile(__dirname+"/login.html")
})

app.get("/renew",(req,res)=>{
    res.sendFile(__dirname+"/renew.html")
})

//post code for mongoose , mongodb

app.post("/submit",(req,res)=>{

    var fname = req.body.data[firstname];
    var lname =req.body.data[lastname];
    var year = req.body.data[Year];
    var branch = req.body.data[Branch];

    var data = {
        "Fname": fname,
        "Lname": lname,
        "Year": year,
        "Branch": branch
    }

    



    db.collection('details').insertOne(data,function(err, collection){
        if (err) throw err;
        console.log("Record inserted Successfully");
              
    });
})

//post code for mongoose, mongodb


*/


const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const ejs = require('ejs');

// Mongoose code
const mongoose = require('mongoose');
mongoose.connect("mongodb://ebus:hari@ac-6xmoinf-shard-00-00.zet193z.mongodb.net:27017,ac-6xmoinf-shard-00-01.zet193z.mongodb.net:27017,ac-6xmoinf-shard-00-02.zet193z.mongodb.net:27017/?ssl=true&replicaSet=atlas-q4r8l1-shard-0&authSource=admin&retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var db = mongoose.connection;


db.on('error', console.log.bind(console, "connection error"));
db.once('open', function (callback) {
    console.log("connection succeeded");
})

// Mongoose db end 
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.set('view engine', 'ejs')

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})


app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/about.html")
})

app.get("/register", (req, res) => {
    res.sendFile(__dirname + "/register.html")
})

app.get("/student", (req, res) => {
    res.sendFile(__dirname + "/student.html")
})

app.get("/driver", (req, res) => {
    res.sendFile(__dirname + "/driver.html")
})

app.get("/administratorData", (req, res) => {
    res.sendFile(__dirname + "/administratorData.html")
})

app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/login.html")
})

app.get("/renew", (req, res) => {
    res.sendFile(__dirname + "/renew.html")
})

app.get("/adminlogin", (req, res) => {
    res.sendFile(__dirname + "/adminlogin.html")
})


app.get("/studentlogin",(req,res)=>{
    res.sendFile(__dirname+"/stulogin.html")
})

app.get("/registersuccess",(req,res)=>{
    res.sendFile(__dirname+"/registersucess.html")
})

app.get("/payment",(req,res)=>{
    res.sendFile(__dirname+"/payments.html")
})
//post code for mongoose , mongodb

app.post("/submit", (req, res) => {

    // var fname = req.body.data[firstname];
    // var lname =req.body.data[lastname];
    var name = req.body.Name;
    var year = req.body.Year;
    var email = req.body.Email;
    var route = req.body.Route;
    var Rollno = req.body.rollno;
    var branch = req.body.Branch;
    var Busno = req.body.Busno;

    var data = {
        "Name": name,
        "Year": year,
        "Branch": branch,
        "Email": email,
        "Route": route,
        "rollno": Rollno,
        "busno": Busno
    }





    db.collection('details').insertOne(data, function (err, collection) {
        if (err) throw err;
        console.log("Record inserted Successfully");



    });
    res.redirect("/payment");
})


var schema = new mongoose.Schema({
    Name: String,
    Year: String,
    Branch: String,
    Email: String,
    Route: String,
    rollno: String,
    busno: String
})

const details = mongoose.model('details', schema);

app.get("/hello", (req, res) => {
    details.find({}, function (err, pass) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
                dataa: pass
            })
            // console.log(pass);
        }
    })

})



app.listen(process.env.PORT || 3000, () => {
    console.log("==> server is running on port 3000");
})