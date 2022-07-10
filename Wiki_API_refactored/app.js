const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const controller = require('./controllers/controller')

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// Requests Targetting All Articles
app.route('/articles')
  .get(controller.get)
  .post(controller.post)
  .delete(controller.delete);

// Requests Targetting a Specific Article
app.route('/articles/:articleTitle')
  .get(controller.getArticle)
  .post(controller.putArticle)
  .patch(controller.patchArticle)
  .delete(controller.deleteArticle);


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
