import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {editUser} from '../../actions/UsersActions';


export class Modal extends Component {

    constructor(){
        super();
        this.state ={
            id : '',
            firstName : '',
            lastName : '',
            job : '',
            username : '',
            password : ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(newProps){ console.log(newProps)
        this.setState({
            id : newProps.user.id,
            firstName: newProps.user.firstName,
            lastName: newProps.user.lastName,
            job: newProps.user.job,
            username: newProps.user.username,
            password: newProps.user.hiddenPassword
        });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    
    onSubmit(e) { 
        e.preventDefault();
        const user = {
        firstName: this.state.firstName,
        lastName : this.state.lastName,
        job : this.state.job,
        username: this.state.username,
        password: this.state.password,
        };
        this.props.editUser(user, this.props.history, this.state.id);
    }
    render() {

        return (
            <div className="modal" id="userModal">
                <div className="modal-dialog">
                    <div className="modal-content">     
                        <div className="modal-body">
                            <form className="m-5 register-form">
                                <div className="row">
                                    <h4 className="loyiha-boshqaruvi">Loyihalar Boshqaruvi</h4>
                                </div>
                                <div className="row">
                                    <input name="firstName" type="text" onChange={this.onChange} placeholder="Ismingiz" 
                                    defaultValue={this.state.firstName}/>
                                </div>
                                <div className="row">
                                    <input name="lastName" type="text" onChange={this.onChange}  placeholder="Familiyangiz" 
                                    defaultValue={this.state.lastName}/>
                                </div>
                                <div className="row">
                                    <input name="job" type="text" onChange={this.onChange}  placeholder="Lavozimingiz" 
                                    defaultValue={this.state.job}/>
                                </div>
                                <div className="row">
                                    <input name="username" type="text" onChange={this.onChange}  placeholder="Login" 
                                    defaultValue={this.state.username}/>
                                </div>
                                <div className="row">
                                    <input name="password" type="password" onChange={this.onChange}  placeholder="password" 
                                    defaultValue={this.state.password}/>
                                </div>
                                <button className="btn btn-success pl-5 pr-5 pt-2 pb-2" type="button" data-dismiss="modal"  onClick={this.onSubmit}>Ro'yhatdan o'tqazish</button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
};

Modal.propTypes = {
    editUser : PropTypes.func.isRequired
}

export default connect(null, {editUser}) (Modal)
