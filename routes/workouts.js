const express = require('express');
const router = express.Router();

const Workout = require('../models/workouts');

// GET to workouts/
// View all workouts
// public access

router.get('/', (req, res) => {
    var query = Workout.find();
    query.exec((err, docs) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: docs });
    });
});

  
router.post('/', (req, res) => {
    const Workout = new Workout();
    // body parser lets us use the req.body
    const { author, text } = req.body;
    if (!author || !text) {
        // we should throw an error. we can do this check on the front end
        return res.json({
            success: false,
            error: 'You must provide an author and comment'
        });
    }
    comment.author = author;
    comment.text = text;
    comment.save(err => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

module.exports = router;