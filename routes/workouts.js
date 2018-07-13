const express = require('express');
const router = express.Router();

const Workout = require('../models/workouts');

// display workout
router.get('/', (req, res) => {
    console.log(req.query);
    const date = req.query.date;

    if (req.query) {
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
        date: new Date(req.body.date)
    });
    console.log(JSON.stringify(newWorkout));
    if (!newWorkout.name || !newWorkout.mode) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'You must provide a name and mode'
        });
    }
    newWorkout.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;