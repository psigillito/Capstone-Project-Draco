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
                        <td>{exercise.weight}</td>
                        <td>{exercise.unit}</td>
                    </tr>
                )
            )
        }else if(this.props.type == "Running"){
            return(
                    this.props.workout.exercises.map( (exercise, index) => 
                    <tr key={index}>
                        <td className="td-fixed-width">{exercise.name}</td>
                        <td className="td-fixed-width">{exercise.distance}</td>
                        <td className="td-fixed-width">{exercise.distanceUnit}</td>
                    </tr>
                    
                )
            )
        }
    }
}

export default WorkOutDetail