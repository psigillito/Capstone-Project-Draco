// user profile information
const express = require('express');
const router = express.Router();
const passport = require('passport');
const queries = require('./queries');

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

// edit user profile
router.patch('/edit-profile', passport.authenticate('jwt', { session: false }), (req, res) => {
	const errors = {};
	let updateObj = {};

	// check if email or username already exists if changed
	if(req.body) {
		
		const email = req.body.email;
		const username = req.body.username;

		if(email !== req.user.email) {
			User.findOne({ email: email })
				.then(user => {
					if(user) {
						errors.email = 'Email already exists';
						return res.status(400).json(errors);
					} 
				})
				.catch(err => console.log(err));
		} else {
			// check username
			if(username !== req.user.username) {
				User.findOne({ username: username })
					.then(user => {
						if(user) {
							errors.username = 'User with that username already exists';
							return res.status(400).json(errors);
						}
					})
			}
		}

	} 
	
	updateObj.name = req.body.name;
	updateObj.email = req.body.email;
	updateObj.username = req.body.username;

	queries.updateUserToken(req.user.id, updateObj, res);
			
});

module.exports = router;