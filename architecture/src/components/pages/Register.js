import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { addUser} from '../../actions/UsersActions';


class Register extends Component {

    constructor(){
        super();
        this.state ={
            firstName : '',
            lastName : '',
            job : '',
            username : '',
            password : ''
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
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
        this.props.addUser(user, this.props.history);
    }


    render() {
        return (
            <div className="container-fuild">
                <img className="bacgimg" src="./images/bacgimg.jpg" alt="qurilish" />
                <div className="row">
                    <div className="col-md-4 offset-4 register">
                        <Link to="/admin"><span className="fas fa-backspace"></span></Link>
                        <form className="m-5 register-form" onSubmit={this.onSubmit}>
                            <div className="row">
                                <h4 className="loyiha-boshqaruvi">Loyihalar Boshqaruvi</h4>
                            </div>
                            <div className="row">
                                <input name="firstName" type="text" onChange={this.onChange} placeholder="Ism" required/>
                            </div>
                            <div className="row">
                                <input name="lastName" type="text" onChange={this.onChange}  placeholder="Familiya" required/>
                            </div>
                            <div className="row">
                                <input name="job" type="text" onChange={this.onChange}  placeholder="Lavozim" required/>
                            </div>
                            <div className="row">
                                <input name="username" type="text" onChange={this.onChange}  placeholder="Login" required/>
                            </div>
                            <div className="row">
                                <input name="password" type="password" onChange={this.onChange}  placeholder="Parol" required/>
                            </div>
                            <button className="btn btn-success pl-5 pr-5 pt-2 pb-2" type="submit">Ro'yhatdan o'tkazish</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

Register.propTypes = {
    addUser : PropTypes.func.isRequired
}

export default connect(null, {addUser}) (Register)