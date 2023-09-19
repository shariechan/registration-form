var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var {DATA_PATH } = require('../constants');
var fs = require('fs');

router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login' });
})

/* POST login route. */
router.post('/', async function(req, res, next) {
    const { email, password } = req.body;

    if (fs.existsSync(DATA_PATH)) {
        data = JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
    }

    const users = data?.users ? data.users : [];

    const user = users.find(u => u.email === email);
    
    if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = {
            id: user.id,
            name: user.name,
            email: user.email
        };
        res.redirect('/users');
    } else {
        res.send('Invalid login credentials');
    }
});

module.exports = router;
