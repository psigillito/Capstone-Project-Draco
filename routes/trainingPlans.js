const express = require('express');
const router = express.Router();
const passport = require('passport');
const queries = require('./queries');

// import model
const TrainingPlan = require('../models/trainingPlans');

function lookUpTrainingPlan(req, res, next) {
	var trainingPlanId = req.params.id;
	req.trainingPlan = TrainingPlan.findById(trainingPlanId, (error, result) => {
		if (error) {
			res.statusCode = 500;
			return res.json({errors: 'Could not retrieve training plan'});
		}
		else if (result === null) {
			res.statusCode = 404;
			return res.json({errors: 'Training plan not found'});
		}
		req.trainingPlan = result;
		next();
	});
}

// gets a specified user's training plans in database
router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
	queries.getTrainingPlan(req.user._id.valueOf(), res);
});

// gets a specified training plan by Id
router.get('/:id', passport.authenticate('jwt', {session: false}), lookUpTrainingPlan, (req, res) => {
	res.statusCode = 200;
	res.json(req.trainingPlan);
});

// create a new training plan
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const newTrainingPlan = new TrainingPlan({
		user: req.user._id.valueOf(),
		name: req.body.name,
		workouts: (req.body.workouts) ? req.body.workouts : [],
		active: true,
		startDate: (req.body.startDate) ? new Date(req.body.startDate) : null,
		endDate: (req.body.endDate) ? new Date(req.body.endDate) : null
	});

	// Update a user's numTrainingPlans
	queries.updateUsersNumTrainingPlans(req.user._id.valueOf());

	queries.createTrainingPlan(newTrainingPlan, (plan) => {
		queries.addTrainingPlanToUser(plan._id.valueOf(), req.user._id.valueOf(), {status:null});
		res.status(201).json(plan);
	});
});

router.patch('/:id', passport.authenticate('jwt', {session:false}), (req, res) => {
	if (req.body.name || req.body.startDate || req.body.endDate || typeof req.body.active !== "undefined") {
		var updateObj = {};
		if (req.body.name) {
			updateObj.name = req.body.name;
		}
		if (req.body.startDate) {
			updateObj.startDate = req.body.startDate;
		}
		if (req.body.endDate) {
			updateObj.endDate = req.body.endDate;
		}
		if (typeof req.body.active !== "undefined") {
			updateObj.active = req.body.active;
		}
		queries.updateTrainingPlan(req.params.id, updateObj, res);
	} else {
		res.status(400).json({ message: "The request was malformed or invalid" });
	}
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
	queries.deleteTrainingPlanFromUser(req.params.id, req.user._id.valueOf());
	queries.deleteTrainingPlan(req.params.id, res);
});

module.exports = router;