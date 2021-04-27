import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getToken} from '../../actions/AuthActions';


class Login extends Component {

    constructor() {
        super();
        this.state = {
            errors: {},
            username: "",
            password: "",
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.getErrors = this.getErrors.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    onSubmit(e) { 
        e.preventDefault();
        const login = {
            username: this.state.username,
            password: this.state.password,
        };
        this.props.getToken(login);
    }
    componentWillReceiveProps(newProps) {
        if (newProps.auth.validToken) {
            switch(newProps.auth.token.role[0].roleName){
                case "admin" :  newProps.history.push("/derictor");   break;
                case "gip" :  newProps.history.push("/gipProject"); break;
                case "user" :  newProps.history.push("/users"); break;
                case "projectControl" :  newProps.history.push("/manager"); break;
                default : newProps.history.push("/")
            }
        }
        if (newProps.errors) {
            this.setState({ errors: newProps.errors.errors });
        }
    }


    getErrors(errors) {
        if (errors) {
            if (errors.invalid)
                return (
                <div className="pb-3 pt-3">
                    <div className="alert alert-danger text-center m-auto" role="alert">
                    {errors.invalid}
                    </div>
                </div>
                );
            if (errors.username) {
                return (
                <div className="pb-3 pt-3">
                    <div className="alert alert-danger text-center m-auto" role="alert">
                    {errors.username}
                    </div>
                </div>
                );
            }
        }
    }


    render() {
        const { errors } = this.state;
        return (
            <div className="container-fuild">
                <img className="bacgimg" src="./images/bacgimg.jpg" alt="qurilish" />
                <div className="row">
                    <div className="col-md-4 offset-4 login">
                        {this.getErrors(errors)}
                        <form className="m-5 login-form" onSubmit={this.onSubmit}>
                            <div className="row">
                                <h4 className="loyiha-boshqaruvi">Loyihalar Boshqaruvi</h4>
                            </div>
                            <div className="row">
                                <input name="username" type="text" placeholder="Login" onChange={this.onChange} required />
                            </div>
                            <div className="row">
                                <input name="password" type="password" placeholder="password"  onChange={this.onChange} required/>
                            </div>
                            <button className="btn btn-success pl-5 pr-5 pt-2 pb-2">Kirish</button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
};

Login.propTypes = {
    getToken: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToPorps = (state) => ({
    errors: state.errors,
    auth: state.auth,
});

export default connect(mapStateToPorps, {getToken}) (Login)