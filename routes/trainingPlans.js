const express = require('express');
const router = express.Router();

// import model
const TrainingPlan = require('../models/trainingPlans');

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
	console.log(JSON.stringify(req.body));
	if (req.body.user) {
		User.findOneAndUpdate({_id: req.body.user}, {workouts: workouts.push(req.body.workout)}, (error, doc) => {
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