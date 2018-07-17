import React, {Component} from 'react'

class DayDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
            visible: this.props.dayVisible
        }

        this.handleVisibleChange = this.handleVisibleChange.bind(this);

    }

    handleVisibleChange = (newValue) => (e) =>{
        this.props.updateDayVisible(newValue);
    }

    render(){
        return(
            <div>
                { this.props.dayVisible &&
                <div className="dayDetail">
                <div >My Date is: X</div>
                <button onClick={this.handleVisibleChange(false)}>X</button>
                </div>
                }
            </div>
        )
    }
}

export default DayDetail 
