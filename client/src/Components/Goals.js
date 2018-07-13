import React, {Component} from 'react'
import * as goals from '../copy/goals.json'
import * as  logistics from '../copy/logistics.json'

class Goals extends Component{

    render(){
        return (
        <div className="goals-quiz">
            <form action="" method="post" class="goals-quiz">
                <fieldset>
                    <legend>{goals.goals.question}</legend>
                    <input type="radio" name="goals-radio" id="goals-radio-0" required></input>
                    <label for="goals-radio-0">{goals.goals.responses[0].text}</label>
                    <br/>
                    <input type="radio" name="goals-radio" id="goals-radio-1" required></input>
                    <label for="goals-radio-1">{goals.goals.responses[1].text}</label>
                    <br/>
                    <input type="radio" name="goals-radio" id="goals-radio-2" required></input>
                    <label for="goals-radio-2">{goals.goals.responses[2].text}</label>
                    <br/>
                    <input type="radio" name="goals-radio" id="goals-radio-3" required></input>
                    <label for="goals-radio-3">{goals.goals.responses[3].text}</label>
                    <br/>
                    <input type="radio" name="goals-radio" id="goals-radio-4" required></input>
                    <label for="goals-radio-4">{goals.goals.responses[4].text}</label>
                </fieldset>
            </form>
        </div>
        )
    }
}

export default Goals