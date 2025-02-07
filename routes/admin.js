const express = require('express');
const router = express.Router();
const Sermon = require('../models/Sermon');
const Event = require('../models/Event');

// Middleware to check if user is admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') return next();
    res.redirect('/');
};

// Admin Dashboard
router.get('/', isAdmin, (req, res) => res.render('admin'));

// Add Sermon
router.post('/sermons', isAdmin, async (req, res) => {
    const { title, description, videoUrl } = req.body;
    const sermon = new Sermon({ title, description, videoUrl });
    await sermon.save();
    res.redirect('/admin');
});

// Add Event
router.post('/events', isAdmin, async (req, res) => {
    const { title, date, description } = req.body;
    const event = new Event({ title, date, description });
    await event.save();
    res.redirect('/admin');
});

module.exports = router;
