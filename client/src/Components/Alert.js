import React, { Component } from 'react'

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onWarnChange(e.target.value);
  }

  render() {
    if (!this.props.warn) {
      return null;
    } else {
      return (
        <div class="alert alert-warning alert-dismissible" role="alert">
          <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <strong>Warning!</strong> {this.props.text}
        </div>
      );
    }
  }
}

export default Alert