import React, {Component} from 'react';
import nick from '../images/nick.jpg';
import chris from '../images/chris.jpg';

class About extends Component{

    render(){
      return (
        <div>
          <h1>About Our Project</h1>
          <div className="card about-section">
            <div className="card-body">
              <h4 className="card-title">Project Summary</h4>
              <p className="card-text">There are a lot of applications for tracking past exercises but not a lot of resources for planning future workouts.
                It is daunting for a beginner to decide on what workouts to do and even more difficult to remember what you are supposed 
                to do each day.  
              </p>

              <p className="card-text">Our application aims to address these issues by providing an easy way to get workout recommendations and
                create a training regiment.  Our application uses a simple calendar interface to display workouts for each day.
                Users can create workout plans and customize details including workout intensity, which weekdays they will do the 
                exercises, number of sets, number of reps, etc.  Users can manually create, modify, and delete their workouts 
                through the interface.  Users can also get a recommended training regiment by providing some basic information on 
                their fitness goals.   
              </p>
              <h4 className="card-title">Team Members</h4>
              <table></table>
              <tr>
                <td>
                  <figure className="figure">
                      <img src={chris} className="team-member-image"/>
                      <figcaption className="fig-caption">Christopher Capps</figcaption>
                  </figure>
                </td>
                <td>
                  <figure className="figure">
                    <img src={nick} className="team-member-image"/>
                    <figcaption className="fig-caption">Nicholas DeJarnette</figcaption>
                  </figure>
                </td>
                <td>
                  <figure className="figure">
                    <img src={nick} className="team-member-image"/>
                    <figcaption className="fig-caption">Philip Sigillito</figcaption>
                  </figure>
                </td>
              </tr>
            </div>
          </div>
        </div>
      )
    }
}

export default About