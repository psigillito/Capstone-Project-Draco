// users.js will handle all user registration and login
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const queries = require('./queries');

// Import user model
const User = require('../models/users');

// Import key
const keys = require('../config/keys');

function lookUpUser(req, res, next) {
	var userId = req.params.id;
	req.userInfo = User.findById(userId, (error, result) => {
		if (error) {
			res.statusCode = 500;
			return res.json({errors: 'Could not retrieve user'});
		}
		else if (result === null) {
			res.statusCode = 404;
			return res.json({errors: 'User not found'});
		}
		req.userInfo = result;
		next();
	});
}

function isEmpty(obj) {
	for(var key in obj) {
		if(obj.hasOwnProperty(key))
			return false;
	}
	return true;
}

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
			}
		});
	// check password
	if(req.body.password.length < 5) {
		errors.password = 'Password must be at least 5 characters';	
	}
	// check username
	User.findOne({ username: req.body.username })
		.then(user => {
			if(user) {
				errors.username = 'Username already exists';			
			}
		});
	
	// wait on async functions above to finish		
	setTimeout(function() {
		if(isEmpty(errors)) {
			// Create new user
			const newUser = new User({
				email: req.body.email,
				name: req.body.name,
				username: req.body.username,
				password: req.body.password,
				trainingPlans: [],
				numTrainingPlans: 0,
				numWorkouts: 0
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
		} else {
			return res.status(400).json(errors);
		}
	}, 500);

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
						const payload = {id: user.id, name: user.name, goals: user.goals};

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

//set stravaToken on authorization
router.patch('/setStravaToken', (req, res) =>{

	User.update({_id: req.body.userId},{$set:{stravaToken: req.body.stravaToken }}, (error, doc) => {
		if(error){
			console.log(error);
		}
	})
});

//get User
router.get('/getUser', (req, res) =>{
	const query = User.find(req.query);
	User.findOne({_id: req.query._id}, (err, docs) => {
		if(err) return res.status(400).json({ msg: 'failure', error: err });
		return res.json(docs);
	});
})

router.get('/:id', passport.authenticate('jwt', {session:false}), lookUpUser, (req, res) => {
	res.status(200).json(req.userInfo);
});

router.patch('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
	if (req.body.goals && req.body.logistics) {
		queries.createRecommendedTrainingPlan(req.body.goals, req.body.logistics, req.user._id.valueOf());
		queries.updateUser(req.params.id, {goals: req.body.goals, logistics: req.body.logistics}, res);
	} else if (req.body.email || req.body.name || req.body.username) {
		updateObj = {};
		if (req.body.email) {
			updateObj.email = req.body.email;
		}
		if (req.body.name) {
			updateObj.name = req.body.name;
		}
		if (req.body.username) {
			updateObj.username = req.body.username
		}
		queries.updateUser(req.params.id, updateObj, res);
	}
	else {
		res.status(400).json({ message: "Request malformed or invalid"});
	}
});

router.delete('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
	queries.deleteAllUserData(req.params.id, res);
});

module.exports = router;