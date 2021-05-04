import React, { Component } from 'react'
import {addDocument} from '../../actions/ProjectActions'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

export class DocumentModal extends Component {

    constructor(){
        super();
        this.state = {
            document : ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    

    onChange(e){
        console.log(e.target.name)
        this.setState({ [e.target.name] : e.target.value});
        
    }

    onSubmit(){
        const comment = {
            comment : this.state.document,
            projectId : this.props.projectId
        }
        console.log(comment)
        this.props.addDocument(comment)
    }

    render() {
        return (
            <div className="modal" id="documentModal">
                <div className="modal-dialog">
                    <div className="modal-content">     
                        <div className="modal-body">
                            <form className="m-5 register-form text-center">
                                <div className="row">
                                    <h4 className="loyiha-boshqaruvi">Hujjatlar</h4>
                                </div>
                                <div className="row">
                                    <textarea name="document" type="text" onChange={this.onChange} placeholder="Hujjatlar" 
                                    className="w-100 m-5" style={{minHeight:"150px"}} required defaultValue={this.props.document}/>
                                </div>
                                <button className="btn btn-success pl-5 pr-5 pt-2 pb-2" type="button" data-dismiss="modal"  onClick={() => this.onSubmit()}>Hujjatlarni kiritish</button>
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

DocumentModal.propTypes = {
    addDocument : PropTypes.func.isRequired
}

export default connect(null, {addDocument}) (DocumentModal)
