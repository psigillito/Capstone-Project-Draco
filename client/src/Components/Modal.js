import React from 'react'
import { Modal, Button } from 'react-bootstrap'

class ModalWrapper extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const title = this.props.title;
    const submitBtnText = this.props.text;
    return (
      <div className="static-modal">
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {this.props.children}
          </Modal.Body>

          <Modal.Footer>
            <Button>Close</Button>
            <Button bsStyle="primary" onClick={this.handleSubmit}>{submitBtnText}</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  }
}

export default ModalWrapper