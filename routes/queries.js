const User = require('../models/users');
const Workout = require('../models/workouts');
const TrainingPlan = require('../models/trainingPlans');

/*
 * This function gets a user object by specified userId
 * @parameter {object} userId, the id string specifying the user to fetch
 * @parameter {object} res, the response object from the route
**/
var _getUser = function(userId, res) {
	User.findById(userId, (error, doc) => {
		if (error) {
			console.log(error);
		}
		res.json(doc);
	});
}

/*
 * This function saves a new User object (newUser)
 * @parameter {object} newUser, contains the fields that define a new user
 * @parameter {function} callback, function to execute when the save "promise" returns
**/
var _createUser = function(newUser, callback) {
	newUser.save().then(callback);
}

/*
 * This function updates a user specified by userId with the information contained in updateObj
 * @parameter {string} userId, the id string specifying the user to update
 * @parameter {object} updateObj, object specifying that fields to be updated
 * @parameter {object} res, the response object from the route
**/
var _updateUser = function(userId, updateObj, res) {
	User.findByIdAndUpdate(userId, updateObj, {new:true}, (error, doc) => {
		if (error) {
			console.log(error);
			res.status(500).json({error:"Unable to retrieve user"});
		}
		else if (doc === null) {
			res.status(404).json({error:"Unable to find user"});
		}
		else {
			res.status(200).json(doc);
		}
	});
}

/*
 * This function deletes a user specified by userId
 * @parameter {string} userId, the id string specifying the user to delete
 * @parameter {object} res, the response object from the Express route
**/
var _deleteUser = function(userId, res) {
	User.findByIdAndRemove(userId, (error, doc) => {
		if (error) {
			console.log(error);
			res.status(500).json({error:"Unable to retrieve user"});
		}
		else if (doc === null) {
			res.status(404).json({error: "Unable to find user"});
		}
		else {
			res.status(200).json(doc);
		}
	});
}

/*
 * This function gets a trainingPlan object by specified trainingPlanId
 * @parameter {object} trainingPlanId, the id string specifying the user to fetch trainingPlans for
 * @parameter {object} res, the response object from the route
**/
var _getTrainingPlan = function(userId, res) {
	TrainingPlan.find({user: userId}, (error, result) => {
		if (error) {
			console.log(error);
			res.statusCode = 500;
			return res.json({errors: 'Could not retrieve training plans'});
		}
		if (result === null) {
			res.statusCode = 404;
			return res.json({errors: 'Training plans not found'});
		}
		if (typeof res !== "undefined") {
			res.statusCode = 200;
			return res.json(result);
		}
	});
}

/*
 * This function saves a new TrainingPlan object (newTrainingPlan)
 * @parameter {object} newTrainingPlan, contains the fields that define a new trainingPlan
 * @parameter {function} callback, function to execute when the save "promise" returns
**/
var _createTrainingPlan = function(newTrainingPlan, callback) {
	newTrainingPlan.save().then(callback);
}

/*
 * This function updates a trainingPlan specified by trainingPlanId
 * @parameter {string} trainingPlanId, the id string specifying the trainingPlan to update
 * @parameter {object} updateObj, object specifying that fields to be updated
 * @parameter {object} res, the response object from the route
**/
var _updateTrainingPlan = function(trainingPlanId, updateObj, res) {
	TrainingPlan.findByIdAndUpdate(trainingPlanId, updateObj, {new: true}, (error, result) => {
		if (error) {
			console.log(error);
			res.status(500).json({errors: 'Could not retrieve training plans'});
		}
		else if (result === null) {
			res.status(404).json({errors: 'Training plan not found'})
		}
		else {
			res.status(200).json(result);
		}
	});
}

/*
 * This function deletes a trainingPlan specified by trainingPlanId
 * @parameter {string} trainingPlanId, the id string specifying the trainingPlan to delete
 * @parameter {object} OPTIONAL res, the response object from the Express route
**/
var _deleteTrainingPlan = function(trainingPlanId, res) {
	TrainingPlan.findByIdAndRemove(trainingPlanId, (error, result) => {
		console.log(result);
		if (error) {
			console.log(error);
			res.status(500).json({errors: 'Could not retrieve training plans'});
		}
		else if (result === null) {
			res.json({errors: 'Training plan not found'});
		}
		else {
			res.status(200).json(result);
		}
	});
}

/*
 * This function gets a workout object by specified workoutId
 * @parameter {object} workoutId, the id string specifying the workout to fetch
 * @parameter {object} res, the response object from the route
**/
var _getWorkout = function(userId, res, options) {
	var queryObj = {};
	if (typeof options !== "undefined") {
		queryObj = options;
	}
	queryObj.user = userId;
	Workout.find(queryObj, (error, doc) => {
		if (error) {
			console.log(error);
			res.status(500).json({errors: 'Could not retrieve workout'});
		}
		else if (doc === null) {
			res.status(404).json({errors: 'Workout not found'});
		}
		else {
			res.status(200).json(doc);
		}
	});
}

/*
 * This function saves a new Workout object (newWorkout)
 * @parameter {object} newWorkout, contains the fields that define a new workout
 * @parameter {string} userId, the id string specifying the user to update
 * @parameter {object} res, the response object from Express
**/
var _createWorkout = function(newWorkout, userId, res) {
	newWorkout.save((err, doc) => {
        if (err) {
            return res.status(500).json({errors:'Unable to create workout'});
        }
        _updateUsersNumWorkouts(userId.valueOf());
        _addWorkoutToTrainingPlan(doc.trainingPlan, doc._id.valueOf());
        return res.status(200).json(doc);
    });
}

/*
 * This function updates a workout specified by workoutId
 * @parameter {string} workoutId, the id string specifying the workout to update
 * @parameter {object} updateObj, object specifying that fields to be updated
 * @parameter {object} res, the response object from the route
**/
var _updateWorkout = function(workoutId, updateObj, res) {
	Workout.findByIdAndUpdate(workoutId, updateObj, {new:true}, (error, doc) => {
		if (error) {
			console.log(error);
			res.status(500).json({errors:'Unable to retrieve workout'});
		}
		else if (doc === null) {
			res.status(404).json({erros:'Workout not found'});
		}
		else {
			res.status(200).json(doc);
		}
	});
}

/*
 * This function deletes a workout specified by workoutId
 * @parameter {string} workoutId, the id string specifying the workout to delete
 * @parameter {object} OPTIONAL res, the response object from the Express route
**/
var _deleteWorkout = function(workoutId, res) {
	Workout.findByIdAndRemove(workoutId, (error, doc) => {
		if (error) {
			console.log(error);
			res.status(500).json({errors:'Could not retrieve workout'});
		}
		if (doc === null) {
			res.status(404).json({errors: 'Workout not found'});
		}
		else {
			_deleteWorkoutFromTrainingPlan(doc.trainingPlan, workoutId);
			res.status(200).json(doc);
		}
	});
}

/*
 * This function updates the number of workouts a specified user has created
 * @parameter {string} userId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _updateUsersNumWorkouts = function(userId, res) {
	User.findById(userId, 'numWorkouts', (error, result) => {
		if (error) {
			console.log(error);
		}
		var num = result.numWorkouts + 1;
		User.findByIdAndUpdate(userId, {numWorkouts: num}, (error, doc) => {});
	});
}

/*
 * This function updates the number of training plans a specified user has created
 * @parameter {string} userId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _updateUsersNumTrainingPlans = function(userId, res) {
	User.findById(userId, 'numTrainingPlans', (error, result) => {
		if (error) {
			console.log(error);
		}
		var num = result.numTrainingPlans + 1;
		User.findByIdAndUpdate(userId, {numTrainingPlans: num}, (error, doc) => {});
	});
}

/*
 * This function deletes all of a user's data before the user entity itself is deleted
 * @parameter {string} userId
**/
var _deleteAllUserData = function(userId) {
	User.findById(userId, 'workouts trainingPlans', (error, result) => {
		if (error) {
			console.log(error);
		}
		result.workouts.forEach(workout => {
			_deleteWorkout(workout);
		});
		result.trainingPlans.forEach(trainingPlan => {
			_deleteTrainingPlan(trainingPlan);
		});
	});
}

/*
 * This function adds a reference to a workout to a specified training plan
 * @parameter {string} trainingPlanId
 * @parameter {string} workoutId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _addWorkoutToTrainingPlan = function(trainingPlanId, workoutId, res) {
	TrainingPlan.findById(trainingPlanId, 'workouts', (error, result) => {
		if (error) {
			console.log(error);
		}
		var newWorkouts = result.workouts;
		newWorkouts.push(workoutId);
		_updateTrainingPlan(trainingPlanId, {workouts: newWorkouts}, res);
	});
}

/*
 * This function deletes a reference to a workout from a specified training plan
 * @parameter {string} trainingPlanId
 * @parameter {string} workoutId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _deleteWorkoutFromTrainingPlan = function(trainingPlanId, workoutId, res) {
	TrainingPlan.findById(trainingPlanId, 'workouts', (error, result) => {
		if (error) {
			console.log(error);
		}
		var indexToRemove = result.workouts.indexOf(workoutId);
		var newWorkouts = result.workouts;
		newWorkouts.splice(indexToRemove, 1);
		_updateTrainingPlan(trainingPlanId, {workouts: newWorkouts}, res);
	});
}

/*
 * This function deletes a reference to a workout from a specified user
 * @parameter {string} workoutId
 * @parameter {string} userId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _deleteWorkoutFromUser = function(workoutId, userId, res) {
	User.findById(userId, 'workouts', (error, result) => {
		if (error) {
			console.log(error);
		}
		var indexToRemove = result.workouts.indexOf(workoutId);
		var newWorkouts = result.workouts;
		newWorkouts.splice(indexToRemove, 1);
		_updateUser(userId, {workouts: newWorkouts}, res);
	});
}

/*
 * This function adds a reference to a trainingPlan to a specified user
 * @parameter {string} trainingPlanId
 * @parameter {string} userId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _addTrainingPlanToUser = function(trainingPlanId, userId, res) {
	User.findById(userId, 'trainingPlans', (error, result) => {
		if (error) {
			console.log(error);
		}
		var newTPs = result.trainingPlans;
		newTPs.push(trainingPlanId);
		User.findByIdAndUpdate(userId, {trainingPlans: newTPs}, (error, doc) => {});
	});
}

/*
 * This function deletes a reference to a trainingPlan from a specified user
 * @parameter {string} trainingPlanId
 * @parameter {string} userId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _deleteTrainingPlanFromUser = function(trainingPlanId, userId, res) {
	console.log(userId);
	User.findById(userId, 'trainingPlans', (error, result) => {
		if (error) {
			console.log(error);
		}
		var indexToRemove = result.trainingPlans.indexOf(trainingPlanId);
		var newTPs = result.trainingPlans;
		newTPs.splice(indexToRemove, 1);
		_updateUser(userId, {trainingPlans: newTPs}, res);
	});
}

/*
 * This function deletes all of a trainingPlans's workouts before the trainingPlan entity itself is deleted
 * @parameter {string} trainingPlanId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _deleteAllTrainingPlanWorkouts = function(trainingPlanId, res) {
	TrainingPlan.findById(trainingPlanId, 'workouts', (error, result) => {
		if (error) {
			console.log(error);
		}
		result.workouts.forEach(workout => {
			_deleteWorkout(workout);
		});
		if (typeof res !== "undefined") {
			res.json({action: "deleted", entityId: userId});
		}
	});
}

/*
* This function deletes an exercise from a workout
* @parameter {string} workoutId
* @parameter {string} exerciseName
* @parameter {object} res, the response object from the route
**/
var _deleteExercise = function(workoutId, exerciseName, res) {
	Workout.update({"_id": workoutId}, {"$pull" : { "exercises" : {"name": exerciseName }}}, (err, data) => {
        console.log(err, data);
        if(!err) {
        	res.json({ success: true });
        }
    });
}

queries = {
	getUser: _getUser,
	createUser: _createUser,
	updateUser: _updateUser,
	deleteUser: _deleteUser,
	getWorkout: _getWorkout,
	createWorkout: _createWorkout,
	updateWorkout: _updateWorkout,
	deleteWorkout: _deleteWorkout,
	getTrainingPlan: _getTrainingPlan,
	createTrainingPlan: _createTrainingPlan,
	updateTrainingPlan: _updateTrainingPlan,
	deleteTrainingPlan: _deleteTrainingPlan,
	deleteAllUserData: _deleteAllUserData,
	updateUsersNumWorkouts: _updateUsersNumWorkouts,
	updateUsersNumTrainingPlans: _updateUsersNumTrainingPlans,
	addWorkoutToTrainingPlan: _addWorkoutToTrainingPlan,
	deleteWorkoutFromTrainingPlan: _deleteWorkoutFromTrainingPlan,
	deleteWorkoutFromUser: _deleteWorkoutFromUser,
	addTrainingPlanToUser: _addTrainingPlanToUser,
	deleteTrainingPlanFromUser: _deleteTrainingPlanFromUser,
	deleteAllTrainingPlanWorkouts: _deleteAllTrainingPlanWorkouts,
	deleteExercise: _deleteExercise
}

module.exports = queries;