const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(logger);
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const userRouter = require('./routes/users');

app.use('/users', userRouter);

function logger(req, res, next) {
  console.log(req.originalUrl);
  next();
}

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
