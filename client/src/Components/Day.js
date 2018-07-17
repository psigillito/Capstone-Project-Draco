import React, {Component} from 'react'
import DayDetail from './DayDetail'

class Day extends Component {

    constructor(props){
        super(props);
        this.handleVisibleChange = this.handleVisibleChange.bind(this);
    }

    handleVisibleChange = (newValue) => (e) =>{
        console.log("RENDER FIRED!")
        this.props.updateDayVisible(newValue);
    }


    render(){
        if(this.props.date != 'X'){            
            return(
                
                <div>
                    <button onClick={this.handleVisibleChange(true)} data-toggle="modal" data-target="#dayModal" className="dayButton">{this.props.date}</button>
                </div>
                
            )
        }else {
            return(
                <span></span>
            )
        }
    }   
}

export default Day