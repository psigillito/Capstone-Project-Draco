import React from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

class NumericValidation extends React.Component {

    render() {
        return (
            <FormGroup controlId={this.props.id} validationState={this.props.validationState}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl type="number" onChange={this.props.onChange} />
                {this.props.help && this.props.validationState === "error" && <HelpBlock>{this.props.help}</HelpBlock>}
            </FormGroup>
        );
    }
}

export default NumericValidation