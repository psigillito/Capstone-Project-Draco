// users.js will handle all user registration and login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

// Import user model
const User = require('../models/users');

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
				return res.status(400).json({errors});
			} else {
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
				return res.status(404).json({errors});
			} 

			// check for correct password
			bcrypt.compare(password, user.password)
				.then(match => {
					if(match) {
						res.json({msg: 'success'});
					} else {
						errors.password = 'Password incorrect';
						return res.status(400).json({errors});
					}
				})
		});
});

module.exports = router;