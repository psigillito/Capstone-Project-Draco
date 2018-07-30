const User = require('../models/users');
const Workout = require('../models/workouts');
const TrainingPlan = require('../models/trainingPlans');

/*
 * This function saves a new User object (newUser)
 * Then calls the callback function
**/
var _createUser = function(newUser, callback) {
	newUser.save().then(callback);
}

/*
 * This function updates a user specified by userId
 * with the object defined in updateObj
**/
var _updateUser = function(userId, updateObj) {
	User.findByIdAndUpdate(userId, updateObj, (error, doc) => {
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});
}

/*
 * This function deletes a user specified by userId
**/
var _deleteUser = function(userId) {
	User.findByIdAndRemove(userId, (error, doc) => {
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});
}

/*
 * This function saves a new TrainingPlan object (newTrainingPlan)
 * Then calls the callback function
**/
var _createTrainingPlan = function(newTrainingPlan, callback) {
	newTrainingPlan.save().then(callback);
}

/*
 * This function updates a trainingPlan specified by trainingPlanId
 * with the object defined in updateObj
**/
var _updateTrainingPlan = function(trainingPlanId, updateObj) {
	TrainingPlan.findByIdAndUpdate(trainingPlanId, updateObj, (error, doc) => {
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});
}

/*
 * This function deletes a trainingPlan specified by trainingPlanId
**/
var _deleteTrainingPlan = function(trainingPlanId) {
	TrainingPlan.findByIdAndRemove(trainingPlanId, (error, doc) => {
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});
}

/*
 * This function saves a new Workout object (newWorkout)
 * Then calls the callback function
**/
var _createWorkout = function(newWorkout, callback) {
	newWorkout.save().then(callback)
}

/*
 * This function updates a workout specified by workoutId
 * with the object defined in updateObj
**/
var _updateWorkout = function(workoutId, updateObj) {
	Workout.findByIdAndUpdate(workoutId, updateObj, (error, doc) => {
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});
}

/*
 * This function deletes a workout specified by workoutId
**/
var _deleteWorkout = function(workoutId) {
	Workout.findByIdAndRemove(workoutId, (error, doc) => {
		if (error) {
			console.log(error);
			console.log(doc);
		}
	});
}

queries = {
	createUser: _createUser,
	updateUser: _updateUser,
	deleteUser: _deleteUser,
	createWorkout: _createWorkout,
	updateWorkout: _updateWorkout,
	deleteWorkout: _deleteWorkout,
	createTrainingPlan: _createTrainingPlan,
	updateTrainingPlan: _updateTrainingPlan,
	deleteTrainingPlan: _deleteTrainingPlan,
}

module.exports = queries;