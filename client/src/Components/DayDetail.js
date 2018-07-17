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
                    <div class="modal fade" id="dayModal" tabindex="-1" role="dialog">
                        <div class="modal-dialog" role="document">
                            <div class="modal-content">
                                    <div class="modal-header">
                                        <h4 class="modal-title">DATE</h4>
                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                    </div>
                                    <div class="modal-body">
                                        <div>Needs to fetch Day data</div>
                                    </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-primary" onClick={this.handleSubmit}>Save</button>
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
