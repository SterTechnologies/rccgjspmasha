const express = require('express');
const passport = require('passport');
const router = express.Router();

// Login
router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login'
}));

// Register
router.get('/register', (req, res) => res.render('register'));
router.post('/register', (req, res) => {
    const { username, password } = req.body;
    User.register(new User({ username }), password, (err, user) => {
        if (err) return res.redirect('/auth/register');
        passport.authenticate('local')(req, res, () => res.redirect('/dashboard'));
    });
});

// Logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;
