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
 * @parameter {object} res OPTIONAL the response object from the route
**/
var _updateUser = function(userId, updateObj, res) {
	User.findByIdAndUpdate(userId, updateObj, (error, doc) => {
		if (error) {
			console.log(error);
		}
		if (typeof res !== "undefined") {
			res.json(doc);
		}
	});
}

/*
 * This function deletes a user specified by userId
 * @parameter {string} userId, the id string specifying the user to delete
 * @parameter {object} OPTIONAL res, the response object from the Express route
**/
var _deleteUser = function(userId, res) {
	User.findByIdAndRemove(userId, (error, doc) => {
		if (error) {
			console.log(error);
		}
		if (typeof res !== "undefined") {
			res.json({action: "deleted", entityId: userId});
		}
	});
}

/*
 * This function gets a trainingPlan object by specified trainingPlanId
 * @parameter {object} trainingPlanId, the id string specifying the trainingPlan to fetch
 * @parameter {object} res, the response object from the route
**/
var _getTrainingPlan = function(trainingPlanId, res) {
	TrainingPlan.findById(trainingPlanId, (error, doc) => {
		if (error) {
			console.log(error);
		}
		res.json(doc);
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
 * @parameter {object} res OPTIONAL the response object from the route
**/
var _updateTrainingPlan = function(trainingPlanId, updateObj, res) {
	TrainingPlan.findByIdAndUpdate(trainingPlanId, updateObj, (error, doc) => {
		if (error) {
			console.log(error);
		}
		if (typeof res !== "undefined") {
			res.json(doc);
		}
	});
}

/*
 * This function deletes a trainingPlan specified by trainingPlanId
 * @parameter {string} trainingPlanId, the id string specifying the trainingPlan to delete
 * @parameter {object} OPTIONAL res, the response object from the Express route
**/
var _deleteTrainingPlan = function(trainingPlanId, res) {
	TrainingPlan.findByIdAndRemove(trainingPlanId, (error, doc) => {
		if (error) {
			console.log(error);
		}
		if (typeof res !== "undefined") {
			res.json({action: "deleted", entityId: trainingPlanId});
		}
	});
}

/*
 * This function gets a workout object by specified workoutId
 * @parameter {object} workoutId, the id string specifying the workout to fetch
 * @parameter {object} res, the response object from the route
**/
var _getWorkout = function(workoutId, res) {
	Workout.findById(workoutId, (error, doc) => {
		if (error) {
			console.log(error);
		}
		res.json(doc);
	});
}

/*
 * This function saves a new Workout object (newWorkout)
 * @parameter {object} newWorkout, contains the fields that define a new workout
 * @parameter {function} callback, function to execute when the save "promise" returns
**/
var _createWorkout = function(newWorkout, callback) {
	newWorkout.save().then(callback)
}

/*
 * This function updates a workout specified by workoutId
 * @parameter {string} workoutId, the id string specifying the workout to update
 * @parameter {object} updateObj, object specifying that fields to be updated
 * @parameter {object} res OPTIONAL the response object from the route
**/
var _updateWorkout = function(workoutId, updateObj, res) {
	Workout.findByIdAndUpdate(workoutId, updateObj, (error, doc) => {
		if (error) {
			console.log(error);
		}
		if (typeof res !== "undefined") {
			res.json(doc);
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
		}
		if (typeof res !== "undefined") {
			res.json({action: "delete", entityId: workoutId});
		}
	});
}



/*
 * This function returns all the trainingPlans from a specified user
 * @parameter {string} userId 
 * @returns {array} containing ids of the trainingPlans
**/
var _findTrainingPlansFromUser = function(userId) {
	// query workouts to get an array of workouts
	TrainingPlan.find({user: userId}, '_id', (err, trainingPlan) => {
		if (err) {
			console.log(err);
			console.log(trainingPlan);
		}
		return trainingPlan;
	});
}

/*
 * This function returns the number of trainingPlans from a specified user
 * @parameter {string} userId 
 * @returns {number} containing the total number of the trainingPlans the user has created
**/
var _findNumTrainingPlansFromUser = function(userId) {
	// query workouts to get an array of workouts
	User.findById(userId, 'numTrainingPlans', (err, result) => {
		if (err) {
			console.log(err);
			console.log(result);
		}
		return result;
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
		this.updateUser(userId, {numWorkouts: num}, res);
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
		this.updateUser(userId, {numTrainingPlans: num}, res);
	});
}

/*
 * This function deletes all of a user's data before the user entity itself is deleted
 * @parameter {string} userId
 * @parameter {object} res, the response object from the route OPTIONAL
**/
var _deleteAllUserData = function(userId, res) {
	User.findById(userId, 'workouts trainingPlans', (error, result) => {
		if (error) {
			console.log(error);
		}
		result.workouts.forEach(workout => {
			this._deleteWorkout(workout);
		});
		result.trainingPlans.forEach(trainingPlan => {
			this._deleteTrainingPlan(trainingPlan);
		});
		if (typeof res !== "undefined") {
			res.json({action: "deleted", entityId: userId});
		}
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
		this._updateTrainingPlan(trainingPlanId, {workouts: newWorkouts}, res);
	});
}

/*
 * This function returns all the workouts from a specified trainingPlan
 * @parameter {string} trainingPlanId 
 * @returns {array} containing ids of the workouts
**/
var _findWorkoutsFromTrainingPlan = function(trainingPlanId) {
	// query workouts to get an array of workouts
	var workouts = Workout.find({trainingPlan: trainingPlanId}, {_id:1}, (err, workout) => {
		if (err) {
			console.log(err);
			console.log(workout);
		}
		return workout;
	});
	return workouts;
}

/*
 * This function returns all the workouts from a specified user
 * @parameter {string} userId 
 * @returns {array} containing ids of the workouts
**/
var _findWorkoutsFromUser = function(userId) {
	// query workouts to get an array of workouts
	Workout.find({user: userId}, '_id', (err, workout) => {
		if (err) {
			console.log(err);
			console.log(workout);
		}
		return workout;
	});
}

/*
 * This function returns the number of workouts from a specified user
 * @parameter {string} userId 
 * @returns {number} containing the total number of the workouts the user has created
**/
var _findNumWorkoutsFromUser = function(userId, res) {
	User.findById(userId, { numWorkouts: 1, _id:0 }, (err, result) => {
		if (err) {
			console.log(err);
		}
		res.json(result);
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
	findWorkoutsFromTrainingPlan: _findWorkoutsFromTrainingPlan,
	findWorkoutsFromUser: _findWorkoutsFromUser,
	findTrainingPlansFromUser: _findTrainingPlansFromUser,
	findNumTrainingPlansFromUser: _findNumTrainingPlansFromUser,
	findNumWorkoutsFromUser: _findNumWorkoutsFromUser,
	updateUsersNumWorkouts: _updateUsersNumWorkouts,
	updateUsersNumTrainingPlans: _updateUsersNumTrainingPlans,
	deleteWorkoutFromTrainingPlan: _deleteWorkoutFromTrainingPlan
}

module.exports = queries;