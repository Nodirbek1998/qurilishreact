import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProgress} from '../../actions/ProgreesActions'
import DocumentModal from '../layout/DocumentModal'
import {activeProject} from '../../actions/ProjectActions'
import {Link} from 'react-router-dom'

export class ProjectManager extends Component {
    constructor() {
        super();  
        this.state = {
            userid : '',
            document : ''
        }
        this.onClick = this.onClick.bind(this);
        this.editDocument = this.editDocument.bind(this);
    }

    componentDidMount(){
        const id = this.props.match.params.id;
            const percent = {
                projectId : id
            }
            this.props.getProgress(percent)
        
    }

    onClick(){
        this.props.activeProject(this.props.match.params.id)
    }

    editDocument(document){
        this.setState({
            document : document
        })
    }

    render() {
        let count = 0;
        let tablebody;
        const project = this.props.project;
        if(project.usersList !== undefined){
            tablebody =Array.isArray(project.usersList)?project.usersList.map((row) => { count = count + 1
                return (
                    <tr key={row.id}>
                        <td>{count}</td>
                        <td>{row.name}</td>
                        <td>
                            {row.comment.length > 0 ? 
                            <p className="user-comment">
                            {row.comment.map(item =>{
                                return(
                                    <div>
                                        <p className="p-0 m-0 bg-success text-light mb-2 mt-2">{item.createdAt}</p>
                                        <p className="p-0 m-0">{item.comment}</p>
                                    </div>
                                )
                            })}
                            </p>
                            :
                            <div>Izoh yo`q</div>
                            }
                            
                        </td>
                        <td>{project.projectCreated}</td>
                        <td>{project.projectFinished}</td>
                        <td style={{maxWidth:'100px'}}>
                            <div className="progress" style={{height:'20px'}}>
                                <div className="progress-bar bg-success" style={{width:`${row.userPercent}%`}}>
                                {row.userPercent}%</div>
                            </div>
                        </td>
                    </tr>
                );
            }):''
        }
        let comment ;
        if (project.proRectorComment !== undefined) {
            comment = Array.isArray(project.proRectorComment) ? project.proRectorComment.map(Item => {
                return(
                    <div>
                        <p className="p-0 m-0 bg-success text-light mb-2 mt-2">{Item.createdAt}</p>
                        <p className="p-0 m-0">{Item.comment}</p>
                    </div>
                )
            })
            :
            <div></div>
        }
        return (
            <div className="container-fuild">
                {/* {this.props.message !== undefined ? 
                    <div class="alert alert-success alert-dismissible w-50">
                        <button type="button" class="close"  data-dismiss="alert">×</button>
                        {this.props.message}
                    </div> : ''} */}
                <div className="row user-navbar">
                    <div className="col m-3">
                        <p className="text-light">
                        <Link to="/manager" className=" pl-3 pr-3 p-2 mr-5"><span className="fas fa-sign-in-alt text-light"></span></Link>
                        Loyiha nomi : {this.props.project.projectName}</p>
                        <div className="progress" style={{height:'30px'}}>
                            <div className={this.props.project.projectPercent > 50 ? "progress-bar bg-success" : "progress-bar bg-warning"}
                            style={{width:`${this.props.project.projectPercent}%`}}>
                            {this.props.project.projectPercent}%</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-check bg-light mt-3 pt-1 pb-1">{
                                    project.projectMake ? 
                                    <input type="checkbox" className="form-check-input " name="active"  checked/> 
                                    : <input type="checkbox" className="form-check-input " name="active" onClick={this.onClick} />
                                }
                                    
                                    <span className="ml-2" style={{fontSize:"14px"}}>Ishga tushirish</span>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="mt-3">
                                    {this.props.project.document ? 
                                        <div> 
                                            <p className="document-area">
                                            {this.props.project.document}
                                            </p>
                                            <button className="btn btn-success edit-btn ml-4"  data-toggle="modal" data-target="#documentModal" onClick={() => this.editDocument(this.props.project.document)}>
                                                <span className="fas fa-edit ml-2"></span></button>
                                        </div>
                                        :
                                        <button className="btn btn-success" type="button" data-toggle="modal" data-target="#documentModal"
                                            >Hujjatni kiritish</button>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row m-4">
                    <div className="col-md-4 mt-4 proRector-ism">
                        
                        {project.proRector !== undefined ? <span>{project.proRector.firstName} </span> : ""} 
                        {project.proRector !== undefined ? project.proRector.lastName : ""}
                    </div>
                        <div className="col-md-8">
                            <div className="proRector">
                                {comment}
                            </div>
                        </div>
                    </div>
                <div className="row">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>N<sup className="mb-1 pt-1">o</sup><i className="tartib-raqam">-</i></th>
                            <th>Bajaruvchilar</th>
                            <th>Izohlar</th>
                            <th >Boshlanish vaqti</th>
                            <th>Tugash vaqti</th>
                            <th>Ish foizi </th>
                        </tr>
                        </thead>
                        <tbody>
                            {tablebody}
                        </tbody>
                    </table>
                </div>     
                    <DocumentModal projectId={this.props.match.params.id} document={this.state.document}/>
            </div>
        )
    }
}

ProjectManager.propTypes = {
    getProgress : PropTypes.func.isRequired,
    activeProject : PropTypes.func.isRequired,
    project : PropTypes.object.isRequired,
    token : PropTypes.object.isRequired,
    message : PropTypes.string.isRequired

}

const mapStateToPorps = (state) =>({
    project : state.ProgressReducer.projectProgress,
    token : state.auth.token,
    message : state.MessageReducer.message
})

export default connect(mapStateToPorps, { getProgress, activeProject}) (ProjectManager)