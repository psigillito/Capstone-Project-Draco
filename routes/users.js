// users.js will handle all user registration and login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

// Import user model
const User = require('../models/users');

// Import key
const keys = require('../config/keys');

// POST to users/register
// Register a user
// Public access
router.post('/register', (req, res) => {
	// Errors object
	const errors = {};

	// Check if email already exists
	User.findOne({ email: req.body.email })
		.then(user => {
			if(user) { // email was found
				errors.email = 'Email already exists';
				return res.status(400).json(errors);
			} else {

				User.findOne({ username: req.body.username })
					.then(user => {
						if(user) {
							errors.username = 'Username already exists';
							return res.status(400).json(errors)
						}
					})
				// Create new user
				const newUser = new User({
					email: req.body.email,
					name: req.body.name,
					username: req.body.username,
					password: req.body.password
				});

				// Encrypt password
				bcrypt.genSalt(10, (err, salt) => {
					bcrypt.hash(newUser.password, salt, (err, hash) => {
						if(err) throw err;
						newUser.password = hash;
						// Save user
						newUser.save()
							.then(user => res.json(user))
							.catch(err => console.log(err));
					});
				});	
			}
		});
});

// POST to users/login
// Allow a user to login
// Public access
router.post('/login', (req, res) => {
	// Errors object
	const errors = {};

	const email = req.body.email;
	const password = req.body.password;

	// Find user by email
	User.findOne({ email })
		.then(user => {
			if(!user) {
				errors.email = 'No user exists with that email';
				return res.status(404).json(errors);
			} 

			// check for correct password
			bcrypt.compare(password, user.password)
				.then(match => {
					if(match) {
						// user matched
						// create jwt payload
						const payload = {id: user.id, name: user.name};

						// sign the token
						jwt.sign(payload, keys.secretOrKey, { expiresIn: 86400 }, (err, token) => {
							res.json({ success: true, token: "Bearer " + token });
						})

					} else {
						errors.password = 'Password incorrect';
						return res.status(400).json(errors);
					}
				})
		});
});

// delete user account
router.post('/delete', passport.authenticate('jwt', { session: false }), (req, res) => {
	User.findOneAndDelete({ _id: req.user.id })
		.then(res => console.log('user deleted'))
		.catch(err => console.log(err));
});

router.patch('/', (req, res) => {
	console.log(JSON.stringify(req.body));
	if (req.body.id) {
		User.findOneAndUpdate({_id: req.body.id}, {goals: req.body.goals, logistics: req.body.logistics}, (error, doc) => {
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});
	res.json({ success: true });
} else {
	res.status(406).json({ message: "Request must contain a valid user ID" });
}
});

module.exports = router;