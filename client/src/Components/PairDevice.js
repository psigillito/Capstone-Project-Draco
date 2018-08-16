import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import {updateStravaToken} from '../redux/actions'
import {Route, Switch, Link} from 'react-router-dom'
import About from './About'
import GoogleMap from './GoogleMap'
import strava1 from '../images/strava1.PNG';
import strava2 from '../images/strava2.PNG';
import Main from './Main'

class PairDevice extends Component {
  constructor(props){
      super(props);
      this.postToGetToken = this.postToGetToken.bind(this);
      this.getUserData = this.getUserData.bind(this);
  }

  postToGetToken = () =>{
      let url = new URL(document.URL);
      var clientId = 27338; 
      var clientSecret = process.env.REACT_APP_CLIENT_SECRET;
      var clientCode = url.searchParams.get('code');
      var token;
      let postUrl= 'https://www.strava.com/oauth/token?client_id='+clientId+'&client_secret='+clientSecret+'&code='+clientCode;
      axios.post(postUrl).then(res => {    
          token = res.data.access_token;
          axios.patch('/users/setStravaToken', {stravaToken: token, userId: this.props.userId})
          this.props.updateStravaToken(token);
      })
  }

  getUserData = () => (e) => {
      fetch('https://www.strava.com/api/v3/routes/14694348?access_token='+this.props.stravaToken)
      .then((results) => console.log(results.json()));
  }

  render(){
      let url = new URL(document.URL);

      if(url.searchParams.get('code')){
          this.postToGetToken();
          return(
            <div className='centered-section'>
              <h1>Authorization Successfull!</h1>
              <p>You can now pair routes you've made in Strava with cardio workouts!</p>

              
              <Link type="btn" href="/calendar">Return Back to Calendar Page</Link>
            </div>
          )

      } else if(this.props.stravaToken.length > 1){
          return (
            <div className='centered-section'>
              <h1>Account Already Paired</h1>
              <p>If you've made any routes in Strava, you can use them for your workouts!</p>
              <a href="/calendar">Return Back to Calendar Page</a>
            </div>
          )
      }
      else{
        return(
          <div>
            <br/>
            <h1>Pair with Strava</h1>
            <div className='centered-section'>
            <p>Strava is a service that tracks workout activity through GPS. You can create routes, record physical activities,
               and compare yourself with other users.  <a href="https://www.strava.com">Check It Out Here.</a></p>
            <br/>
            <a type="button" className= "btn btn-primary" 
                href="https://www.strava.com/oauth/authorize?client_id=27338&response_type=code&redirect_uri=http://localhost:3000/PairDevice/">
                Authorize
            </a>
            </div>
            <br/>
            <div className="centered-section">
              <p>With your Strava Account paired, you can use routes you've created to plan new exercises.</p>
              <p>Create a Route in Strava's Route Builder: <a href="https://www.strava.com/routes">www.strava.com/routes</a></p>
              <img src={strava1} className="med-size-image"/>
              <br/>
              <br/>
              <p>Then when you go to make a new exercise you can use the route you created!</p>
              <img src={strava2} className="med-size-image"/>
            </div>
          </div>
        )
      }
  }
}

const mapStateToProps = function(state) {
    return { userId: state.auth.user.id, stravaToken: state.stravaToken}
}

export default connect(mapStateToProps, {updateStravaToken} )(PairDevice);