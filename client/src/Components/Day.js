import React, {Component} from 'react'

class Day extends Component {

    render(){
        return(
            <button className="dayButton">{this.props.date}</button>
        )
    }
}

export default Day
