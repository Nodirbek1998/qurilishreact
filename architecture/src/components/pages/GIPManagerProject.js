import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProgress} from '../../actions/ProgreesActions'
import GipProjectModal from '../layout/GIPProjectModal'
import {Link} from 'react-router-dom'

export class UserPanel extends Component {
    constructor() {
        super();  
        this.state = {
            user : {}
        }
        this.onCilick = this.onCilick.bind(this);
    }

    componentDidMount(){
        if(this.props.token.role[0].roleName === 'gip' || this.props.token.role[0].roleName === 'gip1'
                || this.props.token.role[0].roleName === 'gip2'){                
            const id = this.props.match.params.id;
            const percent = {
                projectId : id
            }
            this.props.getProgress(percent)
            }else{
                this.props.history.push("/")}
        
    }


    onCilick(user){
        this.setState({user : user})
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
                        <td>
                            {row.progresses.length > 0 && project.projectMake ? 
                            <button className="btn btn-warning mr-5 pl-3 pr-3 text-light" data-toggle="modal" data-target="#gipProjectModal"
                            onClick={() => this.onCilick(row)}>Tasdiqlash 
                            </button>
                            :
                            <button className="btn btn-success mr-5 pl-3 pr-3 text-light" data-toggle="modal" data-target="#gipProjectModal"
                            disabled>Tasdiqlash 
                            </button>
                            }
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
                        <button type="button" class="close" data-dismiss="alert">×</button>
                        {this.props.message}
                    </div> : ''} */}
                <div className="row user-navbar">
                    <div className="col m-3">
                    <Link to={this.props.token.role[0].roleName === "proRector"? "/gipProject" : "/allProject"} className=" pl-3 pr-3 p-2 mr-5"><span className="fas fa-sign-in-alt text-light"></span></Link>
                        <p className="text-light">Loyiha nomi : {this.props.project.projectName}</p>
                        <div className="progress" style={{height:'30px'}}>
                            <div className="progress-bar bg-warning" style={{width:`${this.props.project.projectPercent}%`}}>
                            {this.props.project.projectPercent}%</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="form-check bg-light mt-3 p-1">{
                                    project.projectMake ? 
                                    <input type="checkbox" className="form-check-input ml-2" name="active"  checked disabled/> 
                                    : <input type="checkbox" className="form-check-input ml-2" name="active" disabled />
                                }
                                    
                                    <span className="ml-2" style={{fontSize:"14px"}}>Ishga tushirish</span>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="mt-3"> 
                                        <div> 
                                            <p className="document-area">
                                            {this.props.project.document}
                                            </p>
                                        </div>
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
                            <th>O'zgarishlar</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tablebody}
                        </tbody>
                    </table>
                    <GipProjectModal user = {this.state.user} projectId = {this.props.match.params.id}/>
                </div>     
            </div>
        )
    }
}

UserPanel.propTypes = {
    getProgress : PropTypes.func.isRequired,
    project : PropTypes.object.isRequired,
    token : PropTypes.object.isRequired,
    message : PropTypes.string.isRequired

}

const mapStateToPorps = (state) =>({
    project : state.ProgressReducer.projectProgress,
    token : state.auth.token,
    message : state.MessageReducer.message
})

export default connect(mapStateToPorps, { getProgress}) (UserPanel)