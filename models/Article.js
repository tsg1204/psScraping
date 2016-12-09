// Require mongoose
var mongoose = require("mongoose");
// Create Schema class
var Schema = mongoose.Schema;

// Create article schema
var ArticleSchema = new Schema({
  // title is a required string
  title: {
    type: String,
    required: true
  },
  // link is a required string
  link: {
    type: String,
    required: true
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: {
    type: Schema.Types.ObjectId,
    ref: "Note"
  }
});

ArticleSchema.pre('remove', function(next) {
    this.model('Note').update(
        {_id: {$in: this.title}}, 
        {$pull: {title: this._id}}, 
        {multi: true},
        next
    );
      Note.remove({title: this.title, body: this.body }).exec();
      Article.remove({note : this._id}).exec();
      next();
  });
// Create the Article model with the ArticleSchema
var Article = mongoose.model("Article", ArticleSchema);

// Export the model
module.exports = Article;
