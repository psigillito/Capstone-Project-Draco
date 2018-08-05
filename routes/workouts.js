const express = require('express');
const router = express.Router();
const passport = require('passport');

const Workout = require('../models/workouts');
const User = require('../models/users');

function lookupWorkout(req, res, next) {
    var workoutId = req.params.id;
    req.workout = Workout.findById(workoutId, (error, result) => {
        if (error) {
            return res.status(500).json({errors: 'Could not retrieve workout'});
        }
        else if (result === null) {
            return res.status(404).json({errors: 'Workout not found'});
        }
        else {
            req.workout = result;
            next();
        }
    });
}

// get all of a user's workouts
router.get('/', passport.authenticate('jwt', {session:false}), (req, res) => {
    if (req.query) {
        queries.getWorkout(req.user._id.valueOf(), res, req.query);
    }
    else {
        queries.getWorkout(req.user._id.valueOf(), res);
    }
});

// get a specific workout
router.get('/:id', passport.authenticate('jwt', {session:false}), lookupWorkout, (req, res) => {
    res.status(200).json(req.workout);
});

// add workout
router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const newWorkout = new Workout({
        name: req.body.name,
        mode: req.body.mode,
        user: req.user._id.valueOf(),
        trainingPlan: req.body.trainingPlan,
        duration: (req.body.duration) ? req.body.duration : null,
        exercises: (req.body.exercises) ? req.body.exercises : null,
        intervals: (req.body.intervals) ? req.body.intervals : null,
        daysOfWeek: (req.body.daysOfWeek) ? req.body.daysOfWeek : null,
        date: new Date(req.body.date)
    });
    console.log(JSON.stringify(newWorkout));
    if (!newWorkout.name || !newWorkout.mode || !newWorkout.trainingPlan || !newWorkout.date) {
        return res.status(400).json({errors: 'Malformed or invalid request'});
    }
    queries.createWorkout(newWorkout, req.user._id.valueOf(), res); 
});

router.patch('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    var workoutExercises = [];
    if (req.body) {
        if (req.body.exercise) {
            Workout.findById(req.params.id, (error, doc) => {
                workoutExercises = doc.exercises;
                if (error) {
                    console.log(error);
                    return res.status(500).json({ errors: 'Could not retrieve workout' });
                }
                else if (doc === null) {
                    return res.status(404).json({ errors: 'Workout not found' });
                }
                workoutExercises.exercises.push(req.body.exercise);
                queries.updateWorkout(req.params.id, { exercises: workoutExercises.exercises }, res);
            });
        }
        else {
            queries.updateWorkout(req.params.id, req.body, res);
        }
    } else {
        res.status(400).json({ errors: 'Malformed or invalid request' });
    }
});

// delete workout
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
    queries.deleteWorkout(req.params.id, res);
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