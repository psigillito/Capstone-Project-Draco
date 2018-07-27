import React, {Component} from 'react'

class TrainingPlanCard extends Component {

    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="card">  
                <button id={this.props.passValue.name} className="btn btn-link card-header" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    {this.props.passValue.name}
                </button>

                <div id="collapseOne" className="collapse" aria-labelledby={this.props.passValue.name} data-parent="#accordion">
                    <div className="card-body">
                        Hello 
                    </div>
                </div>
            </div>
        )
    }
}

export default TrainingPlanCard
