import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {getProjects} from '../../actions/ProjectActions'
import {logout} from '../../actions/AuthActions'

export class Users extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    componentDidMount(){
        if(this.props.token.role[0].roleName === 'admin' || this.props.token.role[0].roleName === 'proRector'){
            this.props.getProjects();
        }else{
        this.props.history.push("/")
    }
    }

    status(status){
        if (status === "active") {
            return "bg-success"
        }if (status === "finished") {
            return "bg-danger"
        } else {
            return "bg-success"
        }
    }

    render() {
        let count = 0;
        let tablebody;
        const projects = this.props.projects;
        if(projects !== {}){
            tablebody =Array.isArray(projects)?projects.map((row) => { count = count + 1
                return (
                    <Link to={`/gip-project-director/${row.id}`} className="row project-link" key={row.id}>
                        <div className="col">{count}</div>
                        <div className="col">{row.projectName}</div>
                        <div className="col">{row.projectCreated}</div>
                        <div className="col">{row.projectFinished}</div>
                        <div className="col">
                            <div className="progress" style={{height:'20px', lineHeight : "18px"}}>
                                <div className={this.status(row.projectStatus)} style={{width:`${row.projectPercent}%`}}>
                                {row.projectPercent}%</div>
                            </div>
                        </div>
                    </Link>
                );
            }):''
        }
        
        return ( 
            <div className="container-fuild">
                <div className="row user-navbar">
                    <div className="col-md-7 mt-3 mb-3">
                        <h3 className="text-light">
                        <Link to="/derictor" className=" pl-3 pr-3 p-2 mr-5"><span className="fas fa-sign-in-alt text-light"></span></Link>
                        Loyihalar
                        </h3>
                    </div>
                    <div className="col-md-5">
                        {this.props.token.role[0].roleName === 'admin' ?
                            <span>
                                <Link to="/allProject" className="btn bg-light text-dark pl-3 pr-3 mr-4 mt-3">Barchasi</Link>
                                <Link to="/active-project" className="btn bg-light text-dark pl-3 pr-3 mr-4 mt-3">Aktiv</Link>
                                <Link to="/finished-project" className="btn bg-light text-dark pl-3 pr-3 mr-4 mt-3">Vaqti tugagan</Link>
                                <Link to="/inProgress-project" className="btn bg-light text-dark pl-3 pr-3 mr-4 mt-3">Tugatilgan</Link>
                            </span>
                            :
                            <div></div>
                        }
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
    getProjects : PropTypes.func.isRequired,
    logout : PropTypes.func.isRequired
}

const mapStateToPorps = (state) =>({
    token : state.auth.token,
    projects : state.ProjectReducer.projects
})
export default connect(mapStateToPorps, { getProjects, logout})  (Users)
