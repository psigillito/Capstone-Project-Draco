import React, { Component } from 'react'

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.title = props.title;
    this.payload = props.payload;
    this.handleSubmit = props.handleSubmit;
  }

  render() {
    return (
        <div class="modal fade" id="myModal" tabIndex="-1" role="dialog">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">{this.title}</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
              <div class="modal-body" id="myModal">
                {this.payload}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Modal