var express = require('express');
var router = express.Router();
var {DATA_PATH } = require("../constants");
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/login');
  }

  if (fs.existsSync(DATA_PATH)) {
    data  = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
  }
  const users = data.users ? data.users : [];
  res.render('users', { users, currentUser: req.session.user  });
});


router.delete('/:id', (req, res) => {
  const userId = req.params.id;

  // Read the current users from the JSON file
  fs.readFile(DATA_PATH, 'utf8', (err, data) => {
      if (err) {
          console.error(err);
          return res.status(500).send({ success: false, message: 'Internal Server Error' });
      }

      let users = JSON.parse(data)?.users;

      // Filter out the user with the given ID
      const updatedUsers = users.filter(user => user.id !== userId);

      // Write the updated users back to the JSON file
      fs.writeFile(DATA_PATH, JSON.stringify({users : updatedUsers}, null, 2), 'utf8', (err) => {
          if (err) {
              console.error(err);
              return res.status(500).send({ success: false, message: 'Internal Server Error' });
          }

          res.send({ success: true, message: 'User deleted successfully' });
      });
  });
});

module.exports = router;