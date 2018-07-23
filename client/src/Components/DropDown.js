import React, {Component} from 'react'


class DropDown extends Component{

    constructor(props){
        super(props)
    
        this.state = {
            listOpen: false,
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May','Jun', 'Jul', 'Aug', 'Sep','Oct', 'Nov', 'Dec']
        }

        this.handleDateChange = this.handleDateChange.bind(this);
    
    }

    toggleList(){
        this.setState(prevState => ({
          listOpen: !prevState.listOpen
        }))
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
            <div className="dd-wrapper">
                <div className="dd-header" onClick={() => this.toggleList()}>
                    <div className="dd-header-title">{this.props.year}</div>
                </div>
                {listOpen && <ul className="dd-list">
                    {months.map( (item, index) => (<li onClick={this.handleDateChange(this.props.year, index)}>{item}</li>)) }
                    </ul>
                }
            </div>
            
        )
    }
}

export default DropDown







