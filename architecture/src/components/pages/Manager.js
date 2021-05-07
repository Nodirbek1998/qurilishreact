import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getProjects} from '../../actions/ProjectActions'
import {logout} from '../../actions/AuthActions'

export class Manager extends Component {

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
                <Link className="nav-link bg-red  btn bg-light" onClick={this.logout} to="logout">
                    Logout
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
        if(this.props.token.role[0].roleName !== 'projectControl'){
            this.props.history.push("/")
        }else{ 
        this.props.getProjects()}
    }

    onClick(id){
        this.props.history.push(`/project/${id}`)
    }
    render() {
        let count = 0;
        let tablebody;
        const projects = this.props.projects;
        if(projects !== {}){
            tablebody =Array.isArray(projects)?projects.map((row) => { count = count + 1
                return (
                    <Link to={`/manager-project/${row.id}`} className="row project-link" key={row.id}>
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
                    <div className="col-md-7 mt-3">
                        <h3 className="text-light">Loyihalar</h3>
                    </div>
                    <div className="col-md-4 mt-3">
                        <span className="text-light">Kotiba {this.props.token.username} </span>
                    </div>
                    <div className="col-md-1 mt-2">{this.signInChecking(this.props.auth)}</div>
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

Manager.propTypes = {
    token : PropTypes.object.isRequired,
    projects : PropTypes.array.isRequired,
    getProjects : PropTypes.func.isRequired
}

const mapStateToPorps = (state) =>({
    token : state.auth.token,
    auth : state.auth,
    projects : state.ProjectReducer.projects
})
export default connect(mapStateToPorps, { getProjects, logout})  (Manager)
