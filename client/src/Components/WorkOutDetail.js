import React, {Component} from 'react'

class WorkOutDetail extends Component{
    constructor(props){
        super(props)
    }

    render(){

        console.log(this.props.workout)
        return(
            
                this.props.workout.exercises.map( (exercise, index) => 
                    <tr key={index}>
                        <td>{exercise.name}</td>
                        <td>{exercise.sets}</td>
                        <td>{exercise.reps}</td>
                    </tr>
                )
        )
    }
}

export default WorkOutDetail