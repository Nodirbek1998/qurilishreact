import React, { Component } from 'react'
import {pushPercent} from '../../actions/ProgreesActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class CommentModal extends Component {

    constructor(){
        super();
        this.state = {
            percent : ""
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(id){
        this.props.pushPercent(id)
    }

    render() {
        const user = this.props.user;
        let row;
        if(user.progresses !== undefined){ 
            row = user.progresses.map(item =>{
                return(
                    <form className="m-5 register-form text-center" key={item.id}>
                        <div className="row">
                            <h4 className="loyiha-boshqaruvi" style={{marginLeft:'200px'}}>Loyihalar Boshqaruvi</h4>
                        </div>
                        <div className="row text-center" style={{marginLeft:'200px'}}>
                            <span>{item.percent}</span>
                        </div>
                        <button className="btn btn-success pt-2 pb-2" type="button" data-dismiss="modal"  onClick={() => this.onSubmit(item.id)}>Tasdiqlash</button>
                    </form>
                )
            })
        }
        return (
            <div className="modal" id="gipProjectModal">
                <div className="modal-dialog w-50">
                    <div className="modal-content">     
                        <div className="modal-body">
                            {row}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

CommentModal.propTypes = {
    pushPercent : PropTypes.func.isRequired
}

export default connect(null, {pushPercent}) (CommentModal)
