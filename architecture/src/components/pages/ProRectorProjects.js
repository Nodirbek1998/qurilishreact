import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {activesProject} from '../../actions/ProjectActions'

export class Users extends Component {

    constructor(){
        super();
        this.state={
        }
    }

    componentDidMount(){
        if(this.props.token.role[0].roleName !== 'proRector'){
            this.props.history.push("/")
        }else{
        this.props.activesProject()}
    }

    render() {
        let count = 0;
        let tablebody;
        const projects = this.props.projects;
        if(projects !== {}){
            tablebody =Array.isArray(projects)?projects.map((row) => { count = count + 1
                return (
                    <Link to={`/proRector-project-manager/${row.id}`} className="row project-link" key={row.id}>
                        <div className="col">{count}</div>
                        <div className="col">{row.projectName}</div>
                        <div className="col">{row.projectCreated}</div>
                        <div className="col">{row.projectFinished}</div>
                        <div className="col">
                            <div className="progress" style={{height:'14px'}}>
                                <div className='progress-bar bg-success' style={{width:`${row.projectPercent}%`}}>
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
                        <Link to="/proRector" className=" pl-3 pr-3 p-2 mr-5"><span className="fas fa-sign-in-alt text-light"></span></Link>
                            Projects </h3>
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
    activesProject : PropTypes.func.isRequired
}

const mapStateToPorps = (state) =>({
    token : state.auth.token,
    projects : state.ProjectReducer.project_active
})
export default connect(mapStateToPorps, { activesProject})  (Users)
