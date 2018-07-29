const express = require('express');
const router = express.Router();
const passport = require('passport');
const queries = require('./queries');

// import model
const TrainingPlan = require('../models/trainingPlans');
const Workout = require('../models/workouts');
const User = require('../models/users');

// currently only gets all training plans in database
router.get('/', (req, res) => {
	const query = TrainingPlan.find();
	query.exec((err, docs) => {
		if (err) return res.status(400).json({ msg: 'failure', error: err });
		console.log(docs);
		return res.json({ msg: 'success', data: docs });
	});
});

// create a new training plan
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const newTrainingPlan = new TrainingPlan({
		user: req.user.id,
		name: req.body.name,
		workouts: req.body.workouts,
		active: true,
		startDate: (req.body.startDate) ? new Date(req.body.startDate) : null,
		endDate: (req.body.endDate) ? new Date(req.body.endDate) : null
	});

	// Update a user's numTrainingPlans
	User.findById(req.body.user, (error, doc) => {
		var userNumPlans = JSON.parse(JSON.stringify(doc)).numTrainingPlans;
		userNumPlans++;
		console.log("Number of training plans: " + userNumPlans);
		queries.updateUser(req.body.user, { numTrainingPlans: userNumPlans })
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});

	newTrainingPlan.save()
		.then(plan => {
			User.findById(req.body.user, (error, doc) => {
				//console.log(doc);
				var userPlans = JSON.parse(JSON.stringify(doc)).trainingPlans;
				//console.log("Here is the id: " + plan._id.toString());
				userPlans.push(plan._id.toString());
				User.findByIdAndUpdate(req.body.user, { trainingPlans: userPlans }, (error, doc) => {
					if (error) {
						console.log(error);
						console.log(doc);
					}
				});
			});
			res.json(plan)
		})
		.catch(err => console.log(err));
});

//get current user workouts based on query
router.get('/currentUserPlans', (req, res) => {
	const query = TrainingPlan.find(req.query);
	query.exec((err, docs) => {
		if (err) return res.status(400).json({ msg: 'failure', error: err });
		return res.json(docs);
	});
});

router.patch('/', (req, res) => {
	var planWorkouts = [];
	console.log(JSON.stringify(req.body));
	if (req.body.id) {
		// make a GET request to get the workouts array for a given training plan
		if (req.body.workoutId) {
			TrainingPlan.findById(req.body.id, (error, doc) => {
				planWorkouts = JSON.parse(JSON.stringify(doc));
				if (error) {
					console.log(error);
				}
				planWorkouts.workouts.push(req.body.workoutId);
				queries.updateTrainingPlan(req.body.id, { workouts: planWorkouts.workouts });
				res.json({ success: true });
			});
		} else if (req.body.name || req.body.startDate || req.body.endDate) {
			var updateObj = {};
			var messageStr = "";
			if (req.body.name) {
				updateObj.name = req.body.name;
				messageStr += "Name "
			}
			if (req.body.startDate) {
				updateObj.startDate = req.body.startDate;
				messageStr += "Start Date "
			}
			if (req.body.endDate) {
				updateObj.endDate = req.body.endDate;
				messageStr += "End Date "
			}
			queries.updateTrainingPlan(req.body.id, updateObj);
			res.json({ success: true, message: messageStr + "field(s) updated" });
		} else {
			res.status(406).json({ message: "Request must contain a valid training plan ID" });
		}
	}
});

router.delete('/', (req, res) => {
	var planWorkouts  = [];
	if (req.query && req.body.user) {
		if (req.query.id) {
			TrainingPlan.findById(req.query.id, (error, doc) => {
				// Save the array of workouts associated with this plan
				planWorkouts = JSON.parse(JSON.stringify(doc)).workouts;
				if (error) {
					console.log(error);
				}
				TrainingPlan.findByIdAndRemove(req.query.id, (error, doc) => {
					if (error) {
						console.log(error);
						console.log(doc);
					}
				});
				// Remove the training plan from the user's plans
				User.findById()
				for (var workout of planWorkouts) {
					// DELETE the individual workouts
					Workout.findByIdAndRemove(workout, (error, doc) => {
						if (error) {
							console.log(error);
							console.log(doc);
						}
					});
				}
				res.json({ success: true });
			});
		}
	} else {
		res.status(406).json({ message: "Invalid training plan ID or user ID"});
	}
});

module.exports = router;