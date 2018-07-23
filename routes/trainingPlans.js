const express = require('express');
const router = express.Router();

// import model
const TrainingPlan = require('../models/trainingPlans');

// currently only gets all training plans in database
router.get('/', (req, res) => {
	const query = TrainingPlan.find();
	query.exec((err, docs) => {
		if(err) return res.status(400).json({ msg: 'failure', error: err });
		return res.json({ msg: 'success', data: docs });
	});
});

// create a new training plan
router.post('/', (req, res) => {
	const newTrainingPlan = new TrainingPlan({
		name: req.body.name,
		workouts: req.body.workouts
	});

	newTrainingPlan.save()
		.then(plan => res.json(plan))
		.catch(err => console.log(err));
});

module.exports = router;