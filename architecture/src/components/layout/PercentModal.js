import React, { Component } from 'react'
import {addPercent} from '../../actions/ProgreesActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class CommentModal extends Component {

    constructor(){
        super();
        this.state = {
            percent : ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    

    onChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    onSubmit(){
        const percent = {
            percent : this.state.percent,
            projectId : this.props.projectId,
            userId : this.props.userId
        }
        this.props.addPercent(percent)
    }

    render() {
        return (
            <div className="modal" id="percentModal">
                <div className="modal-dialog w-50">
                    <div className="modal-content">     
                        <div className="modal-body">
                            <form className="m-5 register-form text-center form-group">
                                <div className="row">
                                    <h4 className="loyiha-boshqaruvi" style={{marginLeft:'200px'}}>Loyihalar Boshqaruvi</h4>
                                </div>
                                <div className="row text-center" style={{marginLeft:'200px'}}>
                                    <input name="percent" type="number" pattern="[0-9]{3}" maxLength={ 2 } title="100 gacha bo'lgan son kiriting"
                                    onChange={this.onChange}  placeholder="100 dan kichik son kiriting"
                                    className="w-50" required/>
                                </div>
                                <button className="btn btn-success pl-5 pr-5 pt-2 pb-2 ml-4" type="button" data-dismiss="modal"  onClick={this.onSubmit}>Yuborish</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-warning" data-dismiss="modal">Yopish</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

CommentModal.propTypes = {
    addPercent : PropTypes.func.isRequired
}

export default connect(null, {addPercent}) (CommentModal)
