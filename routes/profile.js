// user profile information
const express = require('express');
const router = express.Router();
const passport = require('passport');

// Import user model
const User = require('../models/users');

// get current user profile
// private route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	res.json({
		name: req.user.name,
		email: req.user.email,
		username: req.user.username,
		plans: req.user.trainingPlans
	});
});

module.exports = router;