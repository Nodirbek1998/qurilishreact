import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Select from "react-select";
import { getUsers, getUsermap } from "../../actions/UsersActions";
import { DatePicker } from "antd";
import {
    createProject,
    deleteProject,
} from "../../actions/ProjectActions";

function generateUser(users) {
    users = Array.isArray(users) ? users : [];
    const options = users.map((_item) => {
        return {
            label: `${_item.firstName} ${_item.lastName}`,
            value: _item.id,
        };
    });

    return options;
}
function generateUserId(selectOption) {
    const options = selectOption.map((_item) => {
        return _item.value;
    });

    return options;
}

export class Modal extends Component {
    constructor() {
        super();
        this.state = {
            id: null,
            selectOption: null,
            projectController: null,
            projectName: "",
            projectCreat: "",
            projectFinish: "",
            users: [],
            edit: false,
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangecreat = this.onChangecreat.bind(this);
        this.onChangeupdate = this.onChangeupdate.bind(this);
    }
    heandleChange = (selectOption) => {
        this.setState({ selectOption });
    };
    heandleChanged = (projectController) => {
        this.setState({ projectController });
    };

    componentDidMount() {
        this.props.getUsers();
        this.props.getUsermap();
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    onChangecreat(date, dateString) {
        this.setState({
            projectCreat: dateString,
        });
    }
    onChangeupdate(date, dateString) {
        this.setState({
            projectFinish: dateString,
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const project = {
            projectName: this.state.projectName,
            projectCreated: this.state.projectCreat,
            projectFinished: this.state.projectFinish,
            projectManager: this.state.projectController.value,
            usersList: generateUserId(this.state.selectOption),
        };
        this.props.createProject(project);
    }

    render() {

        const users = this.props.users;
        const gipUser = this.props.gipUser
        return (
            <div className="modal" id="creatProjectModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="create-project">
                            <div className="row m-5 text-center display-none">
                                <h4 className="loyiha-boshqaruvi">Loyihalar Boshqaruvi</h4>
                            </div>
                            <form className="m-5 w-100 text-center">
                                <div className="row w-100">
                                    <input
                                        className="projectName"
                                        name="projectName"
                                        type="text"
                                        onChange={this.onChange}
                                        placeholder="Loyiha nomi"
                                        required
                                    />
                                </div>
                                <Select
                                    className="w-100"
                                    onChange={this.heandleChanged}
                                    options={generateUser(gipUser)}
                                    placeholder="Loyiha boshqaruvchisi"
                                    required
                                />
                                <DatePicker
                                    className=" w-100"
                                    name="projectCreat"
                                    onChange={this.onChangecreat}
                                    placeholder="Loyiha boshlash vaqti"
                                    required
                                />
                                <DatePicker
                                    className="w-100 mb-3"
                                    name="projectFinish"
                                    onChange={this.onChangeupdate}
                                    placeholder="Liyiha tugash vaqti"
                                    required
                                />
                                <Select
                                    className="mb-3 w-100"
                                    isMulti
                                    onChange={this.heandleChange}
                                    options={generateUser(users)}
                                    required
                                    placeholder="Loyiha bajaruvchilari"
                                />
                                    <button
                                        className="btn btn-success pl-5 pr-5 pt-2 pb-2"
                                        type="button"
                                        data-dismiss="modal"
                                        onClick={this.onSubmit}
                                    >
                                        Loyiha yaratish
                                    </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-warning"
                                data-dismiss="modal"
                            >
                                yopish
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    createProject: PropTypes.func.isRequired,
    getUsers: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    getUsermap: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
    gipUser: PropTypes.array.isRequired,
};

const mapStateToPorps = (state) => ({
    users: state.UsersReducer.users,
    gipUser: state.UsersReducer.gipUser,
});

export default connect(mapStateToPorps, {
    createProject,
    getUsers,
    deleteProject,
    getUsermap
})(Modal);
