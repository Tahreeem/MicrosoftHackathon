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
        res.render("index", { data: data });
    });
});

app.get("/results", function (req, res) {
    con.query("SELECT * FROM AzureHack.test1;", function (err, data) {
        if (err) throw err;
        console.log(data);
        res.render("results", { data: data });
    });
});

var orm = {
    selectAll: function (tableInput, cb) {
        var getsurveys = "SELECT * FROM " + tableInput + ";";
        con.query(getsurveys, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    insertOne: function (table, cols, vals, cb) {
        var makeNewsurvey = "INSERT INTO " + table;
  
        makeNewsurvey += " (";
        makeNewsurvey += cols.toString();
        makeNewsurvey += ") ";
        makeNewsurvey += "VALUES (";
        makeNewsurvey += printQuestionMarks(vals.length);
        makeNewsurvey += ") ";
  
        console.log(makeNewsurvey);
  
        con.query(makeNewsurvey, vals, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
  };
  
  function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
        arr.push("?");
    }
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
        var value = ob[key];
        // check to skip hidden properties
        if (Object.hasOwnProperty.call(ob, key)) {
            // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
  
    // translate array of strings to a single comma-separated string
    return arr.toString();
  };
  
  var survey = {
    selectAll: function (cb) {
      orm.selectAll("test1", function (res) {
        cb(res);
      });
    },
    // The variables cols and vals are arrays.
    insertOne: function (cols, vals, cb) {
      orm.insertOne("test1", cols, vals, function (res) {
        cb(res);
      });
    }
  };

app.post("/api/submit", function (req, res) {
    survey.insertOne(["recorded", "anger", "contempt", "disgust", "fear", "happiness", "neutral", "sadness", "surprise", "eyeMakeup", "lipMakeup", "moustache", "beard", "smile", "questionOne", "questionTwo", "questionThree", "questionFour"], [ new Date(), req.body.anger, req.body.contempt, req.body.disgust, req.body.fear, req.body.happiness, req.body.neutral, req.body.sadness, req.body.surprise, req.body.eyeMakeup, req.body.lipMakeup, req.body.moustache, req.body.beard, req.body.smile, req.body.questionOne, req.body.questionTwo, req.body.questionThree, req.body.questionFour], function (result) {
        // Send back the ID of the new quote
        res.json({ id: result.insertId });
    });
});

app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});