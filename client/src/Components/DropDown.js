import React, {Component} from 'react'


class DropDown extends Component{

    constructor(props){
        super(props)
    
        this.state = {
            listOpen: false,
            months: ['January', 'February', 'March', 'April', 'May','June', 'July', 'August', 'September','October',
                     'November', 'December']
        }

        this.handleDateChange = this.handleDateChange.bind(this);
    
    }

    handleDateChange = (year, month)=> (e) =>{
        this.props.updateCurrentYear(year);
        this.props.updateDays( month, year);
        this.props.updateMonth(month);
    }

    render(){
        const listOpen = this.state.listOpen;
        const months = this.state.months;
        return(
            <div>
                {
                    <ul className="list-group list-group-flush">
                        {months.map( (item, index) => (<li className="list-group-item" key={index} onClick={this.handleDateChange(this.props.year, index)}>{item}</li>)) }
                    </ul>
                }
            </div>
            
        )
    }
}

export default DropDown







