import React, { Component } from 'react'
import {addProgress} from '../../actions/CommentActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class CommentModal extends Component {

    constructor(){
        super();
        this.state = {
            comment : ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    

    onChange(e){
        console.log(e.target.name)
        this.setState({ [e.target.name] : e.target.value});
        
    }

    onSubmit(){
        console.log(this.props.userId, this.props.projectId);
        const comment = {
            comment : this.state.comment,
            projectId : this.props.projectId,
            userId : this.props.userId
        }
        this.props.addProgress(comment)
    }

    render() {
        return (
            <div className="modal" id="commentModal">
                <div className="modal-dialog">
                    <div className="modal-content">     
                        <div className="modal-body">
                            <form className="m-5 register-form text-center">
                                <div className="row">
                                    <h4 className="loyiha-boshqaruvi">Loyihalar Boshqaruvi</h4>
                                </div>
                                <div className="row">
                                    <textarea name="comment" type="text" onChange={this.onChange} placeholder="Commentariya" 
                                    className="w-100 m-5" style={{minHeight:"150px"}} required/>
                                </div>
                                <button className="btn btn-success pl-5 pr-5 pt-2 pb-2" type="button" data-dismiss="modal"  onClick={this.onSubmit}>Yuborish</button>
                            </form>
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
    addProgress : PropTypes.func.isRequired
}

export default connect(null, {addProgress}) (CommentModal)
