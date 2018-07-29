const express = require('express');
const router = express.Router();

// import model
const TrainingPlan = require('../models/trainingPlans');
const Workout = require('../models/workouts');

// currently only gets all training plans in database
router.get('/', (req, res) => {
	const query = TrainingPlan.find();
	query.exec((err, docs) => {
		if(err) return res.status(400).json({ msg: 'failure', error: err });
		console.log(docs);
		return res.json({ msg: 'success', data: docs });
	});
});

// create a new training plan
router.post('/', (req, res) => {
	const newTrainingPlan = new TrainingPlan({
		user: req.body.user,
		name: req.body.name,
		workouts: req.body.workouts,
		startDate: (req.body.startDate) ? new Date(req.body.startDate) : null,
		endDate: (req.body.endDate) ? new Date(req.body.endDate) : null
	});

	newTrainingPlan.save()
		.then(plan => res.json(plan))
		.catch(err => console.log(err));
});

//get current user workouts based on query
router.get('/currentUserPlans', (req, res) => {
	const query = TrainingPlan.find(req.query);
	query.exec((err, docs) => {
		if(err) return res.status(400).json({ msg: 'failure', error: err });
		return res.json(docs);
	});
});

router.patch('/', (req, res) => {
	var planWorkouts = [];
	console.log(JSON.stringify(req.body));
	if (req.body.id) {
		// make a GET request to get the workouts array for a given training plan
		TrainingPlan.findById(req.body.id, (error, doc) => {
			planWorkouts = JSON.parse(JSON.stringify(doc));
			if (error) {
				console.log(error);
			}
			planWorkouts.workouts.push(req.body.workoutId);
			TrainingPlan.findOneAndUpdate({_id: req.body.id}, {workouts: planWorkouts.workouts}, (error, doc) => {
				if (error) {
					console.log(error);
					console.log(doc);
				}
		});
	});
	res.json({ success: true });
} else {
	res.status(406).json({ message: "Request must contain a valid training plan ID" });
}
});

module.exports = router;