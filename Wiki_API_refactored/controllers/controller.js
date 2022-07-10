const model = require('../models/model');
let Article = model.Article;

exports.get = (req, res) => {
  Article.find((err, foundArticles) => {
    if (!err) {
      res.send(foundArticles);
    } else res.send(err);
  });
}

exports.post = (req, res) => {
  const newArticle = new Article({
    title: req.body.title,
    content: req.body.content
  });
  newArticle.save(err => {
    if (!err) {
      res.send('Data is successfully stored!');
    } else res.send(err);
  })
}

exports.delete = (req, res) => {
  Article.deleteMany((err, deleteArticles) => {
    if (!err) {
      res.send('Data is successfully deleted!');
    } else res.send(err);
  });
}

exports.getArticle = (req, res) => {
  Article.findOne({ title: req.params.articleTitle }, (err, foundArticles) => {
    if (foundArticles) {
      res.send(foundArticles);
    } else res.send('Not found');
  });
}

exports.putArticle = (req, res) => {
  Article.updateOne(
    { title: req.params.articleTitle },
    { title: req.body.title, content: req.body.content },
    (err) => {
      if (!err) res.send('Successfully updated!');
    }
  );
}

exports.patchArticle = (req, res) => {
  Article.findOneAndUpdate(
    { title: req.params.articleTitle },
    { $set: req.body },
    (err) => {
      if (!err) res.send('Successfully patched!');
    }
  );
}

exports.deleteArticle = (req, res) => {
  Article.deleteOne(
    { title: req.params.articleTitle },
    (err) => {
      if (!err) res.send('Successfully deleted!');
    }
  );
}
