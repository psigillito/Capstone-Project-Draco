import React, {Component} from 'react'
import Day from './Day'

class Week extends Component{
    render(){
        return(
            <tr>
                {this.props.days.map( (day, index) => <td><Day date={day} /></td>)}
            </tr>
        )
    }
}

export default Week