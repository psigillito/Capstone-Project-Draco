import React, { Component } from 'react'
import Alert from './Alert'

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = props.handleSubmit;
  }

  render() {
    const title = this.props.title;
    return (
        <div className="modal" id="myModal" role="dialog"> {/* tabIndex="-1" */}
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">{title}</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              </div>
                {this.props.children}
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Submit</button>
              </div>
            </div>
          </div>
        </div>
    );
  }
}

export default Overlay