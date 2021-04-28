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
        const id = this.props.match.params.id;
        setInterval(() =>{
            const percent = {
                projectId : id
            }
            this.props.getProgress(percent)
        }, 4000)
        
    }

    componentWillMount(){
        if(this.props.token.role[0].roleName !== 'gip'){
            this.props.history.push("/")
        }else{
        const id = this.props.match.params.id;
        const percent = {
            projectId : id
        }
        this.props.getProgress(percent)}
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
                            {row.comment !== undefined ? 
                            <p className="user-comment">
                            {row.comment}
                            </p>
                            :
                            <div>Commentariya yo`q</div>
                            }
                        </td>
                        <td>{project.projectCreated}</td>
                        <td>{project.projectFinished}</td>
                        <td style={{maxWidth:'100px'}}>
                            <div className="progress" style={{height:'14px'}}>
                                <div className="progress-bar bg-success" style={{width:`${row.userPercent}%`}}>
                                {row.userPercent}%</div>
                            </div>
                        </td>
                        <td>
                            {row.progresses.length > 0 && project.projectMake ? 
                            <button className="btn btn-danger mr-5 pl-3 pr-3 text-light" data-toggle="modal" data-target="#gipProjectModal"
                            onClick={() => this.onCilick(row)}>Tasdiqlash 
                            </button>
                            :
                            <button className="btn btn-danger mr-5 pl-3 pr-3 text-light" data-toggle="modal" data-target="#gipProjectModal"
                            disabled>Tasdiqlash 
                            </button>
                            }
                        </td>
                    </tr>
                );
            }):''
        }
        return (
            <div className="container-fuild">
                <div className="row user-navbar">
                    <div className="col m-3">
                    <Link to="/gipProject" className=" pl-3 pr-3 p-2 mr-5"><span className="fas fa-sign-in-alt text-light"></span></Link>
                        <p className="text-light">Loyiha nomi : {this.props.project.projectName}</p>
                        <div className="progress" style={{height:'24px'}}>
                            <div className="progress-bar bg-warning" style={{width:`${this.props.project.projectPercent}%`}}>
                            {this.props.project.projectPercent}%</div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-check bg-light mt-3 p-1">{
                                    project.projectMake ? 
                                    <input type="checkbox" className="form-check-input ml-2" name="active"  checked disabled/> 
                                    : <input type="checkbox" className="form-check-input ml-2" name="active" disabled />
                                }
                                    
                                    <span className="ml-4">Active</span>
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
                <div className="row">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>N<sup className="mb-1 pt-1">o</sup><i className="tartib-raqam">-</i></th>
                            <th>Bajaruvchilar</th>
                            <th>Izohlar</th>
                            <th >Boshlanish vaqti</th>
                            <th>Tugash vaqti</th>
                            <th>Progrees bar </th>
                            <th>O'zgarishlar</th>
                        </tr>
                        </thead>
                        <tbody>
                            {tablebody}
                        </tbody>
                    </table>
                    <GipProjectModal user = {this.state.user}/>
                </div>     
            </div>
        )
    }
}

UserPanel.propTypes = {
    getProgress : PropTypes.func.isRequired,
    project : PropTypes.object.isRequired,
    token : PropTypes.object.isRequired

}

const mapStateToPorps = (state) =>({
    project : state.ProgressReducer.projectProgress,
    token : state.auth.token
})

export default connect(mapStateToPorps, { getProgress}) (UserPanel)