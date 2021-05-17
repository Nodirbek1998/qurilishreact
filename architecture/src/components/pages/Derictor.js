import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProjects, deleteProject} from '../../actions/ProjectActions'
import ProjectModal from '../layout/projectModal'
import {Link} from 'react-router-dom'
import CreatProjectModal from '../layout/CreateProjectModal'
import {logout} from '../../actions/AuthActions'



class Derictor extends Component {

    constructor(){
        super();
        this.state = {
            project : {}
        }
        this.deleteProject = this.deleteProject.bind(this)
    }

    logout = () => {
        this.props.logout();
        window.location.href = "/";
    };
    
    signInChecking(auth){
        if (auth.validToken) {
            return (
                <Link className="nav-link text-dark " onClick={this.logout} to="logout">
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
        if(this.props.token.role[0].roleName !== 'admin'){
            this.props.history.push("/")
        }else{
        this.props.getProjects()};
        setInterval(() =>{
            if(this.props.token.role[0].roleName !== 'admin'){
                this.props.history.push("/")
            }else{
            this.props.getProjects();}
        }, 2000)
    }

    onClick(row){
        this.setState({
            project : row
        })
    }

    deleteProject(id){
        this.props.deleteProject(id);
    }

    projectStateClear(){
        this.setState({
            project :{}
        })
    }
    render() {

        let count = 0;
        let tablebody;
        if(this.props.projects.length > 0){
            tablebody = this.props.projects.map((row) => { count = count + 1
                return (
                    <tr key={row.id}>
                        <td>{count}</td>
                        <td>{row.projectManager.firstName} {row.projectManager.lastName}</td>
                        <td style={{maxWidth:"300px"}}>{row.projectName}</td>
                        <td style={{maxWidth:"300px"}}>{row.usersList.map(item =>{
                            return(<p className="m-0 p-0" key={item.id}>{item.firstName} {item.lastName}</p>)
                        })}</td>
                        <td style={{width:"150px"}}><p>{row.projectCreated}</p> <p>{row.projectFinished}</p></td>
                        <td>
                            <button className="btn btn-warning p-1 pl-3 mr-3 pr-3 text-light" onClick={() => this.deleteProject(row.id)}>O'chirish 
                            <span className="fas fa-trash ml-3"></span></button>
                            <button type="button" className="btn btn-success p-1 pl-3 pr-3 text-light" data-toggle="modal" data-target="#editProjectModal"  
                            onClick={() => this.onClick(row)}>O'zgartirish <span className="fas fa-edit ml-2"></span></button>
                        </td>
                    </tr>
                );
            });
        }



        return (
            <div className="container-fuild">
                {/* {this.props.message !== undefined ? 
                    <div class="alert alert-success alert-dismissible w-50">
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        {this.props.message}
                    </div> : ''} */}
                <div className="row derictor-navbar">
                    <nav className="navbar navbar-expand-md p-3">
                        <div className="navbar-brand ml-4" >Direktor <span className="text-capitalize">{this.props.token.username}</span> oynasi</div>
                        <Link className="ml-5 pl-5 pr-5 btn btn-light" to="/admin">ADMIN</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link className="ml-5 pl-5 pr-5 btn btn-light" to="/allProject">Loyihalarga o'tish</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-light ml-5" type="button" data-toggle="modal" data-target="#creatProjectModal"
                                    onClick={() => this.projectStateClear()}>Yangi loyiha qo'shish 
                                    <span className="fas fa-plus-circle pl-3"></span></button>
                            </li>
                            <li className="bg-light ml-3 btn p-0">{this.signInChecking(this.props.auth)}</li>
                        </ul>
                    </nav>
                </div>
                <div className="row">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>N<sup className="mb-1 pt-1">o</sup><i className="tartib-raqam">-</i></th>
                            <th>Loyiha rahbari</th>
                            <th>Loyiha nomi</th>
                            <th >Bajaruvchilar</th>
                            <th>Loyiha vaqti</th>
                            <th>O'zgarishlar</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tablebody}
                        </tbody>
                    </table>
                </div>
                {
                    this.state.project && this.state.project.hasOwnProperty('id') && <ProjectModal project={this.state.project}/>
                }
                <CreatProjectModal />
            </div>
        )
    }
}

Derictor.propTypes ={
    getProjects : PropTypes.func.isRequired,
    deleteProject : PropTypes.func.isRequired,
    projects : PropTypes.array.isRequired,
    message : PropTypes.string.isRequired

}

const mapStateToPorps = (state) =>({
    projects : state.ProjectReducer.projects,
    token : state.auth.token,
    auth : state.auth,
    message : state.MessageReducer.message
});


export default connect(mapStateToPorps, {getProjects, deleteProject, logout}) (Derictor)
