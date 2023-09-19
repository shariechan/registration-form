var express = require("express");
var router = express.Router();
var bcrypt = require('bcryptjs');
var {DATA_PATH } = require('../constants');
var fs = require('fs');

router.get("/", function (req, res, next) {
  res.render('register', { title: 'Register Users' });
});

router.post("/", async function (req, res, next) {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);


  if (fs.existsSync(DATA_PATH)) {
    data = JSON.parse(fs.readFileSync(DATA_PATH, "utf-8"));
  }

  const users = data.users ? data.users : [];

  users.push({ id: users.length + 1, name, email, password: hashedPassword });
  fs.writeFileSync(DATA_PATH, JSON.stringify({
    users 
  }));

  res.redirect("/login");
});
module.exports = router;
