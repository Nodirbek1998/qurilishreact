import React, { Component } from 'react'
import {pushPercent, deleteProgress} from '../../actions/ProgreesActions'
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
        const progress = {
            projectId :this.props.projectId,
            userId : this.props.user.id
        }
        this.props.pushPercent(id, progress)
    }
    deleteProgress(id){
        this.props.deleteProgress(id)
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
                            <span className="ml-5">{item.percent}</span>
                        </div>
                        <button className="btn btn-success pt-2 pb-2" type="button" data-dismiss="modal"  onClick={() => this.onSubmit(item.id)}>Tasdiqlash</button>
                        <button className="btn btn-warning pt-2 pb-2 ml-5" type="button" data-dismiss="modal"  onClick={() => this.deleteProgress(item.id)}>O'chirish</button>
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
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Yopish</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

CommentModal.propTypes = {
    pushPercent : PropTypes.func.isRequired,
    deleteProgress : PropTypes.func.isRequired
}

export default connect(null, {pushPercent, deleteProgress}) (CommentModal)
