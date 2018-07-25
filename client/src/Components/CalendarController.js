
import React, {Component} from 'react'
import DropDown from './DropDown'

class CalendarController extends Component {
    constructor(props) {
        super(props);
        //this.handleDateChange = this.handleDateChange.bind(this);
        //this.toggleMenu = this.toggleMenu.bind(this);

    }

 
    render(){
        return(

            <div id="accordion">
                <div className="card">
                    <div className="card-header" id="headingOne">
                        <h5 class="mb-0">
                            <button className="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                2016
                            </button>
                        </h5>
                    </div>

                    <div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordion">
                        <div className="card-body">
                            <DropDown year='2016' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/> 
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header" id="headingTwo">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            2017
                        </button>
                    </div>
                
                    <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                        <div className="card-body">
                            <DropDown year='2017' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header" id="headingThree">
                        <button className="btn btn-link" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            2018
                        </button>
                    </div>
                

                    <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                        <div className="card-body">
                        <DropDown year='2018' updateMonth={this.props.updateMonth} updateCurrentYear = {this.props.updateCurrentYear} updateDays={this.props.updateDays}/>                        
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default CalendarController