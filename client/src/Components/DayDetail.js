import React, {Component} from 'react'

class DayDetail extends Component {

    constructor(props){
        super(props)

        this.state = {
            visible: this.props.dayVisible
        }
    }

    render(){
        return(
            <div>
                {
                    <div className="modal fade" id="dayModal" tabIndex="-1" role="dialog">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                    <div className="modal-header">
                                        <h4 className="modal-title">DATE</h4>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </div>
                                    <div className="modal-body">
                                        <div>Needs to fetch Day data</div>
                                    </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-primary" onClick={this.handleSubmit}>Save</button>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default DayDetail 
