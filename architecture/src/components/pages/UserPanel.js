import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {getProgress} from '../../actions/ProgreesActions'
import CommentModal from '../layout/CommentModal'
import PercentModal from '../layout/PercentModal'

export class UserPanel extends Component {
    constructor() {
        super();  
        this.state = {
            userid : ''
        }
        this.onCilick = this.onCilick.bind(this);
    }

    componentDidMount(){
        if(this.props.token.role[0].roleName !== 'user'){
            this.props.history.push("/")
        }else{
        const id = this.props.match.params.id;
        console.log(id);
        const percent = {
            projectId : id
        }
        this.props.getProgress(percent)}
    }

    onCilick(id){
        this.setState({userid : id})
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
                            {row.username === this.props.token.username ?
                                <button className="btn btn-danger mr-5 pl-3 pr-3 text-light" data-toggle="modal" data-target="#commentModal"
                                onClick = {() => this.onCilick(row.id)}>Izoh 
                                <img src="../images/edit-regular.svg" className="icon" alt="ortga qaytish" /></button> 
                                    : 
                                <button className="btn btn-danger mr-5 pl-3 pr-3 text-light" disabled>Izoh 
                                <span className="fas fa-edit "></span></button>
                            }
                            {row.username === this.props.token.username ?
                                <button type="button" className="btn btn-warning  pl-3 pr-3 text-light" data-toggle="modal" data-target="#percentModal"  
                                onClick={() => this.onCilick(row.id)}
                                >Foiz qo'shish <img src="../images/plus-circle-solid.svg" className="icon" alt="ortga qaytish" /></button>
                                    :
                                <button type="button" className="btn btn-warning  pl-3 pr-3 text-light" data-toggle="modal" data-target="#userModal"  
                                disabled>Foiz qo'shish <img src="../images/plus-circle-solid.svg" className="icon" alt="ortga qaytish" /></button>
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
                        <p className="text-light">Loyiha nomi : {this.props.project.projectName}</p>
                        <div className="progress" style={{height:'24px'}}>
                            <div className="progress-bar bg-warning" style={{width:`${this.props.project.projectPercent}%`}}>
                            {this.props.project.projectPercent}%</div>
                        </div>
                    </div>
                    <div className="col">

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
                </div>     
                    <CommentModal projectId={project.id} userId={this.state.userid}/>
                    <PercentModal projectId={project.id} userId={this.state.userid}/>
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