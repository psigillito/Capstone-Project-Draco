const express = require('express');
const router = express.Router();

const Workout = require('../models/workouts');

// GET to workouts/
// View all workouts
// public access

router.get('/', (req, res) => {
    console.log(req.query);
    if (req.query) {
        var query = Workout.find(req.query);
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

  
router.post('/', (req, res) => {
    const newWorkout = new Workout({
        name: req.body.name,
        mode: req.body.mode
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