import React, { Component } from 'react'

class Alert extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: props.text };
  }

  render() {
    return (
      <div class="alert alert-warning alert-dismissible" role="alert">
        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <strong>Warning!</strong> {this.state.text}
      </div>
    );
  }
}

export default Alert