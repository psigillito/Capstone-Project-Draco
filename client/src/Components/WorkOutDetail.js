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
                        <td className="text-center">{exercise.name}</td>
                        <td className="text-center">{exercise.distance}</td>
                        <td className="text-center">{exercise.distanceUnit}</td>
                    </tr>
                    
                )
            )
        }
    }
}

export default WorkOutDetail