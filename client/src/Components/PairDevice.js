import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import {updateStravaToken} from '../redux/actions'
import {Route, Switch} from 'react-router-dom'
import About from './About'
import GoogleMap from './GoogleMap'

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
        console.log("CLIENT SECRET IS:"+clientSecret);
        var clientCode = url.searchParams.get('code');
        var token;
        let postUrl= 'https://www.strava.com/oauth/token?client_id='+clientId+'&client_secret='+clientSecret+'&code='+clientCode;
        axios.post(postUrl).then(res => {    
            token = res.data.access_token;

            //send token to be saved in db
            axios.patch('/users/setStravaToken', {stravaToken: token, userId: this.props.userId})
            
            //update state
            this.props.updateStravaToken(token);
        })

    }

    getUserData = () => (e) => {

        console.log("strava Token is: "+this.props.stravaToken)

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
                    <GoogleMap/>
                    <a type="btn" href="/calendar">Return Back to Calendar Page</a>
                    <a href ="https://www.strava.com/api/v3/athlete?access_token=503b305fb6fdd3b5dcbbc7c47176fe5b2a3ecb5b">asdf</a>
                    <button onClick={this.getUserData()}>DRAW ON MAP</button>
                </div>
            )

        } else if(this.props.stravaToken.length > 10){

            return (
                <div className='centered-section'>
                    <h1>Account Already Paired</h1>
                    <a href="/calendar">Return Back to Calendar Page</a>
                </div>
            )
        }
        else{

            return(
                <div>
                    <h1>Authorize This Application To Use Strava</h1>
                    <div className='centered-section'>
                        <p>Click the Button Below</p>
                        <a type="button" className= "btn btn-primary" 
                            href="https://www.strava.com/oauth/authorize?client_id=27338&response_type=code&redirect_uri=http://localhost:3000/PairDevice/">
                            Authorize
                        </a>
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