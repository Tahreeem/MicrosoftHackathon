// var orm = {
//   selectAll: function (tableInput, cb) {
//       var getsurveys = "SELECT * FROM " + tableInput + ";";
//       con.query(getsurveys, function (err, result) {
//           if (err) {
//               throw err;
//           }
//           cb(result);
//       });
//   },
//   insertOne: function (table, cols, vals, cb) {
//       var makeNewsurvey = "INSERT INTO " + table;

//       makeNewsurvey += " (";
//       makeNewsurvey += cols.toString();
//       makeNewsurvey += ") ";
//       makeNewsurvey += "VALUES (";
//       makeNewsurvey += printQuestionMarks(vals.length);
//       makeNewsurvey += ") ";

//       console.log(makeNewsurvey);

//       con.query(makeNewsurvey, vals, function (err, result) {
//           if (err) {
//               throw err;
//           }
//           cb(result);
//       });
//   }
// };

// function printQuestionMarks(num) {
//   var arr = [];

//   for (var i = 0; i < num; i++) {
//       arr.push("?");
//   }
//   return arr.toString();
// }

// // Helper function to convert object key/value pairs to SQL syntax
// function objToSql(ob) {
//   var arr = [];

//   // loop through the keys and push the key/value as a string int arr
//   for (var key in ob) {
//       var value = ob[key];
//       // check to skip hidden properties
//       if (Object.hasOwnProperty.call(ob, key)) {
//           // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
//           if (typeof value === "string" && value.indexOf(" ") >= 0) {
//               value = "'" + value + "'";
//           }
//           arr.push(key + "=" + value);
//       }
//   }

//   // translate array of strings to a single comma-separated string
//   return arr.toString();
// };

// var survey = {
//   selectAll: function (cb) {
//     orm.selectAll("test1", function (res) {
//       cb(res);
//     });
//   },
//   // The variables cols and vals are arrays.
//   insertOne: function (cols, vals, cb) {
//     orm.insertOne("test1", cols, vals, function (res) {
//       cb(res);
//     });
//   }
// };

// // Export the database functions for the controller (catsController.js).
// module.exports = survey;
