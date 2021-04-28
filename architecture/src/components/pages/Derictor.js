import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProjects, deleteProject} from '../../actions/ProjectActions'
import ProjectModal from '../layout/projectModal'
import {Link} from 'react-router-dom'
import CreatProjectModal from '../layout/CreateProjectModal'



class Derictor extends Component {

    constructor(){
        super();
        this.state = {
            project : {}
        }
        this.deleteProject = this.deleteProject.bind(this)
    }
    componentDidMount(){
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
                        <td>{row.projectName}</td>
                        <td style={{maxWidth:"300px"}}>{row.usersList.map(item =>{
                            return(<p className="m-0 p-0" key={item.id}>{item.firstName} {item.lastName}</p>)
                        })}</td>
                        <td style={{width:"150px"}}><p>{row.projectCreated}</p> <p>{row.projectFinished}</p></td>
                        <td>
                            <button className="btn btn-danger p-1 pl-3 mr-3 pr-3 text-light" onClick={() => this.deleteProject(row.id)}>Delete 
                            <span className="fas fa-trash ml-3"></span></button>
                            <button type="button" className="btn btn-warning p-1 pl-3 pr-3 text-light" data-toggle="modal" data-target="#editProjectModal"  
                            onClick={() => this.onClick(row)}>Edit <span className="fas fa-edit ml-2"></span></button>
                        </td>
                    </tr>
                );
            });
        }



        return (
            <div className="container-fuild">
                <div className="row derictor-navbar">
                    <nav className="navbar navbar-expand-md p-3">
                        <div className="navbar-brand ml-4" >Derictor F.I.O oynasi</div>
                        <Link className="ml-5 pl-5 pr-5 btn btn-light" to="/admin">ADMIN</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                            <Link className="ml-5 pl-5 pr-5 btn btn-light" to="/allProject">Loyihalarga o'tish</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-light ml-5" type="button" data-toggle="modal" data-target="#creatProjectModal"
                                    onClick={() => this.projectStateClear()}>Yangi loyiha qo'shish 
                                    <span className="fas fa-plus-circle"></span></button>
                            </li>
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
    projects : PropTypes.array.isRequired

}

const mapStateToPorps = (state) =>({
    projects : state.ProjectReducer.projects,
    token : state.auth.token
});


export default connect(mapStateToPorps, {getProjects, deleteProject}) (Derictor)
