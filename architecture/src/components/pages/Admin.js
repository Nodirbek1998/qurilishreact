import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUsers, deleteUser, getUser, editUser} from '../../actions/UsersActions';
import { Link } from 'react-router-dom';
import Modal from '../layout/registerModal';

export class Admin extends Component {

    constructor(){
        super();
        this.state = {
            users: [],
            user: {
                id : '',
                firstName: "",
                lastName: "",
                job: "",
                username: "",
                password: "",
            },
        };
        this.deleteUser = this.deleteUser.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount(){
        if(this.props.token.role[0].roleName !== 'admin'){
            this.props.history.push("/")
        }else{
        this.props.getUsers();}
        setInterval(() =>{
            if(this.props.token.role[0].roleName !== 'admin'){
                this.props.history.push("/")
            }else{
                this.props.getUsers();}
        }, 4000)
    }
    
    
    deleteUser(id){
        this.props.deleteUser(id, this.props.history);
    }
    
    onClick(row){
        this.setState({
            user : row
        })
    }


    render() {
        let count = 0;
        let tablebody;
        
        if(this.props.users.length > 0){
            tablebody = this.props.users.map((row) => { count = count + 1
                return (
                    <tr key={row.id}>
                        <td>{count}</td>
                        <td>{row.firstName}</td>
                        <td>{row.lastName}</td>
                        <td>{row.job}</td>
                        <td>{row.username}</td>
                        <td>{row.hiddenPassword}</td>
                        <td>
                            {row.roles[0].roleName === "user"  ? 
                            <button className="btn btn-warning p-1 pl-3 mr-3 pr-3 text-light" onClick={() => this.deleteUser(row.id)}>
                                O'chirish 
                            <span className="fas fa-user-times pl-3"></span></button> :
                            <button className="btn btn-warning p-1 pl-3 mr-3 pr-3 text-light" onClick={() => this.deleteUser(row.id)} disabled>
                                O'chirish 
                            <span className="fas fa-user-times pl-3"></span></button>
                            }
                            
                            <button type="button" className="btn btn-success p-1 pl-3 pr-3 text-light" data-toggle="modal" data-target="#userModal"  
                            onClick={() => this.onClick(row)}>O'zgartirish <span className="fas fa-edit pl-2"></span></button>
                        </td>
                    </tr>
                );
            });
        }
        
        return (
            
            <div className="container-fuild">
                {/* {this.props.message !== undefined ? 
                    <div class="alert alert-success alert-dismissible w-50">
                        <button type="button" class="close"   data-dismiss="alert">×</button>
                        {this.props.message}
                    </div> : ''} */}
                <div className="row derictor-navbar">
                <nav className="navbar navbar-expand-md p-3">
                    <p className="text-light ml-5 mt-2" >
                        <Link to="/derictor" className=" pl-3 pr-3 p-2 mr-5"><span className="fas fa-sign-in-alt text-light"></span></Link>
                    ADMIN
                    </p>
                    <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/register">
                            <button className="btn btn-light">
                                Ro'yhatdan o'tkazish <span className="fas fa-plus-circle"></span>
                            </button>
                        </Link>
                    </li>
                    </ul>
                </nav>
                </div>
                <div className="row">
                    <table className="table table-striped table-hover">
                        <thead className="thead-dark">
                        <tr>
                            <th>N<sup className="mb-1 pt-1">o</sup><i className="tartib-raqam">-</i></th>
                            <th>Ism</th>
                            <th>Familiya</th>
                            <th>Lavozim</th>
                            <th>Login</th>
                            <th>Parol</th>
                            <th>O'zgarishlar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tablebody}
                        </tbody>
                    </table>
                </div>
                <Modal user={this.state.user} />
            </div>
        );
    }
}

Admin.propTypes = {
    getUsers : PropTypes.func.isRequired,
    users : PropTypes.array.isRequired,
    user : PropTypes.object.isRequired,
    message : PropTypes.string.isRequired
}

const mapStateToPorps = (state) =>({
    users : state.UsersReducer.users,
    user : state.UsersReducer.user,
    token : state.auth.token,
    message : state.MessageReducer.message
})

export default connect(mapStateToPorps, {getUsers, deleteUser, getUser, editUser}) (Admin)
