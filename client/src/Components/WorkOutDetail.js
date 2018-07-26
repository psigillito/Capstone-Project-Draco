import React, {Component} from 'react'

class WorkOutDetail extends Component{
    constructor(props){
        super(props)
    }

    render(){

        if(this.props.type == "Weight Training"){
            
            return(
                
                this.props.workout.exercises.map( (exercise, index) => 
                    <tr key={index}>
                        <td>{exercise.name}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                    </tr>
                )
            )
        }else if(this.props.type == "Running"){
            return(
                
                    <tr>
                        <td>{this.props.workout.name}</td>
                        <td>{this.props.workout.distance}</td>
                        <td>{this.props.workout.duration}</td>
                    </tr>
            )
        }
    }
}

export default WorkOutDetail