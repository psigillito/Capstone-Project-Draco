
import React, {Component} from 'react'
import DropDown from './DropDown'

class CalendarController extends Component {
    constructor(props) {
        super(props);
    }
 
    render(){
        return(

            <div id="accordion">
                <div className="card">  
                    <button id="headingOne" className="btn btn-link card-header" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                        2017
                    </button>
                   
                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            <DropDown year='2017' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/> 
                        </div>
                    </div>
                </div>

                <div className="card">

                    <button id="headingTwo" className="btn btn-link card-header" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        2018
                    </button>
                
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <DropDown year='2018' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/>
                        </div>
                    </div>
                </div>

                <div className="card">
                    
                    <button id="headingThree" className="btn btn-link card-header" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                        2019
                    </button>

                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                        <DropDown year='2019' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/>                        
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default CalendarController