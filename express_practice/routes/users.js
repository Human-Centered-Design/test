const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
  console.log(req.query.name);
  res.send('User List');
});

router.post('/', (req, res) => {
  const isValid = true;

  if (isValid) {
    users.push({ name: req.body.firstName });
    res.redirect(`/users/${users.length - 1}`);
  } else {
    console.log('Error');
    res.render('users/new', { firstName: req.body.firstName });
  }
});

router.get('/new', (req, res) => {
  res.render('users/new');
});

router
  .route('/:id')
  .get((req, res) => {
    console.log(req.user);
    res.send(`Get User with Id ${req.params.id}`);
  })
  .put((req, res) => {
    res.send(`Put User with Id ${req.params.id}`);
  })
  .delete((req, res) => {
    res.send(`Delete User with Id ${req.params.id}`);
  })

const users = [{name: 'Sally'}, {name: 'Johnny'}];
router.param('id', (req, res, next, id) => {
  req.user = users[id];
  next();
})

module.exports = router;
