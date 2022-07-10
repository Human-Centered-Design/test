const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wikiDB');

const articleSchema = {
  title: String,
  content: String
}

const Article = mongoose.model('Article', articleSchema);

exports.Article = Article;
exports.articleSchema = articleSchema;
