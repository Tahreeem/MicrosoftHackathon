var mongoose = require("mongoose");

//____________________________________________________________________________________________________

var Schema = mongoose.Schema;

var MoodsSchema = new Schema({
  theme: {
    type: String
  },
  title: {
    type: String,
    required: true,
    unique: true
  },
  authors: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  // `note` is an object that stores a Note id
  // The ref property links the ObjectId to the Note model
  // This allows us to populate the Article with an associated Note
  note: {
    type: Schema.Types.ObjectId,
    //ref: "Note"  //can be uncommented if you want a "default" ref; otherwise the specific ones are defined below
  }
}, { upsert: true });


var sentryMental = mongoose.model("sentryMental", MoodsSchema);
sentryMental.schema.paths.note.options.ref = "quantaNotes";


//console.log(natureArticles.schema.paths.note.options);    //.schema.childSchemas);

//____________________________________________________________________________________________________

module.exports = {
    sentryMental
};
