const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Keys = require('./keys');

const options = {};
options.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
options.secretOrKey = Keys.secretOrKey;

module.exports = passport => {
	passport.use(new JWTStrategy(options, (jwt_payload, res) => {
		User.findById(jwt_payload.id)
			.then(user => {
				if(user) {
					return res(null, user);
				} else {
					return res(null, false);
				}
			})
			.catch(err => console.log(err));
	}))
}