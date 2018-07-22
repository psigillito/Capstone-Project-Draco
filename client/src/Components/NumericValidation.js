import React from 'react'
import { FormGroup, Label, Input, FormFeedback } from 'reactstrap'

class NumericValidation extends React.Component {

    render() {
        return (
            <FormGroup>
                <Label>{this.props.label}</Label>
                <Input invalid={!this.props.validationState} valid={this.props.validationState} type="number" id={this.props.id} onChange={this.props.onChange} />
                {this.props.help && this.props.validationState === false && <FormFeedback>{this.props.help}</FormFeedback>}
            </FormGroup>
        );
    }
}

export default NumericValidation