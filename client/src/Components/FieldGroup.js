import React from 'react'
import { FormControl, FormGroup, ControlLabel, HelpBlock } from 'react-bootstrap'

class FieldGroup extends React.Component {

    render() {
        return (
            <FormGroup controlId={this.props.id}>
                <ControlLabel>{this.props.label}</ControlLabel>
                <FormControl {...this.props} />
                {this.props.help && <HelpBlock>{this.props.help}</HelpBlock>}
            </FormGroup>
        );
    }
}

export default FieldGroup