import React, {Component} from 'react'

class Day extends Component {

    render(){

        if(this.props.date != 'X'){            
            return(
                    <button className="dayButton">{this.props.date}</button>
            )
        }else {
            return(
                <span></span>
            )
        }
    }
}

export default Day
