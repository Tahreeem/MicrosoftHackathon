var express = require("express");
var exphbs = require("express-handlebars");
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);
const hbsFormHelper = require('handlebars-form-helper');
var app = express();

var PORT = process.env.PORT || 3000;

app.use(express.static("public"));

const hbs = exphbs.create({
  defaultLayout: 'app',
  extname: '.hbs',
  layoutsDir: `${__dirname}/app/views/layouts/`,
  partialsDir: `${__dirname}/app/views/partials/`,
});
// Call the registerHelper and pass in the handlebars object
hbsFormHelper.registerHelpers(hbs.handlebars, { namespace: 'form' });

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "AzureHack"
});

con.connect(function (err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + con.threadId);
});

app.get("/", function (req, res) {
    con.query("SELECT * FROM AzureHack.survey;", function (err, data) {
        if (err) throw err;
        console.log(data);
        res.render("index", {data: data});
    });
});

app.post("/api/submit", function(req, res) {
    con.query("INSERT INTO test1 (anger, contempt, disgust, fear, happiness, neutral, sadness, surprise, eyeMakeup, lipMakeup, moustache, beard, smile, questionOne, questionTwo, questionThree, questionFour) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", function (err, data) {
        if (err) throw err;
        console.log(data);
        res.render("index", {data: data});
        // res.json({ id: result.insertId });
    });
  });

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});