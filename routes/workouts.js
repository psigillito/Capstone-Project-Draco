const express = require('express');
const router = express.Router();

const Workout = require('../models/workouts');
const User = require('../models/users');

// display workout
router.get('/', (req, res) => {
    console.log(req.query);
    if (req.query.date) {
        const date = req.query.date;
    }

    if (Object.keys(req.query).length != 0) {
        var query = Workout.find({
            date: { $eq: new Date(date)}
        });
        query.exec((err, docs) => {
            if (err) return res.json({ success: false, error: err });
            return res.json({ success: true, data: docs });
        });        
    }
    else {
        var query = Workout.find();
        query.exec((err, docs) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true, data: docs });
        });
    }
});

// add workout
router.post('/', (req, res) => {
    const newWorkout = new Workout({
        name: req.body.name,
        mode: req.body.mode,
        user: req.body.user,
        trainingPlan: req.body.trainingPlan,
        duration: (req.body.duration) ? req.body.duration : null,
        exercises: (req.body.exercises) ? req.body.exercises : null,
        intervals: (req.body.intervals) ? req.body.intervals : null,
        daysOfWeek: (req.body.daysOfWeek) ? req.body.daysOfWeek : null,
        date: new Date(req.body.date)
    });
    console.log(JSON.stringify(newWorkout));
    if (!newWorkout.name || !newWorkout.mode || !newWorkout.user || !newWorkout.trainingPlan || !newWorkout.date) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'You must provide a name, mode, user, training plan, and date'
        });
    }
    newWorkout.save()
        .then(workout => {
            User.findById(req.body.user, (error, doc) => {
                var userNumWorkouts = JSON.parse(JSON.stringify(doc)).numWorkouts;
                userNumWorkouts++;
                User.findByIdAndUpdate(req.body.user, { numWorkouts: userNumWorkouts }, (error, doc) => {
                    if (error) {
                        console.log(error);
                        console.log(doc);
                    }
                });
            });
            res.json({ success: true });
        });
        /*.catch (err => {
        if (err)
            return res.json({ success: false, error: err });
    });*/
});

router.get('/currentWorkouts', (req, res) => {
    console.log('QUERY IS:');
    console.log(req.query)
	const query = Workout.find(req.query);
	query.exec((err, docs) => {
		if(err) return res.status(400).json({ msg: 'failure', error: err });
		console.log(docs)
		return res.json(docs);
	});
});


module.exports = router;