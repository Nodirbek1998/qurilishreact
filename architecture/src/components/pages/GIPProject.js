import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getProjectGip} from '../../actions/ProjectActions'
import {logout} from '../../actions/AuthActions'

export class Users extends Component {

    constructor(){
        super();
        this.state={
        }
    }
    logout = () => {
        this.props.logout();
        window.location.href = "/";
    };
    
    signInChecking(auth){
        if (auth.validToken) {
            return (
                <Link className="nav-link bg-light text-dark btn " onClick={this.logout} to="logout">
                    Chiqish
                </Link>
            )
        }
        return (
            <Link className="nav-link text-white" to="/login">
                Login
            </Link>
        )
    }

    componentDidMount(){
            if(this.props.token.role[0].roleName !== 'gip' && this.props.token.role[0].roleName !== 'gip1' && this.props.token.role[0].roleName !== 'gip2'){
                this.props.history.push("/")
            }else{
            this.props.getProjectGip(this.props.token.username)}
    }

    
    render() {
        let count = 0;
        let tablebody;
        const projects = this.props.projects;
        if(projects !== {}){
            tablebody =Array.isArray(projects)?projects.map((row) => { count = count + 1
                return (
                    <Link to={`/gip-project-manager/${row.id}`} className="row project-link" key={row.id}>
                        <div className="col">{count}</div>
                        <div className="col">{row.projectName}</div>
                        <div className="col">{row.projectCreated}</div>
                        <div className="col">{row.projectFinished}</div>
                    </Link>
                );
            }):''
        }
        
        return ( 
            

            <div className="container-fuild">
                <div className="row user-navbar">
                    <div className="col-md-10 mt-3 mb-2">
                        <h3 className="text-light">
                        Loyihalar </h3>
                    </div>
                    <div className="col-md-2 btn  mt-3">
                    {this.signInChecking(this.props.auth)}
                    </div>
                </div>
                <div className="row bg-light p-4">
                    <div className="col">
                        {tablebody}
                    </div>
                </div>          
            </div>
        )
    }
}

Users.propTypes = {
    token : PropTypes.object.isRequired,
    projects : PropTypes.array.isRequired,
    getProjectusername : PropTypes.func.isRequired
}

const mapStateToPorps = (state) =>({
    token : state.auth.token,
    projects : state.ProjectReducer.gip_project,
    auth : state.auth
})
export default connect(mapStateToPorps, { getProjectGip, logout})  (Users)
