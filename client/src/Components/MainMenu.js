import React, {Component} from 'react'

class MainMenu extends Component {

    constructor(props){
        super(props);


    }





    render(){
        console.log("PASSED TRAINING PLANS");//.props.trainingsPlans);
        console.log(this.props.trainingPlans);
        return(

            <div>
                <div>Active Training Plans:</div>
                <div>
                    {this.props.trainingPlans.data.length > 0 &&
                        <div>
                            {this.props.trainingPlans.data.filter( (plan)=>plan.active ==true).map( (plan, index) => <div>{plan.name}</div>)} 
                        </div>
                    }
                </div>

            </div>
        )
    }
}

export default MainMenu
