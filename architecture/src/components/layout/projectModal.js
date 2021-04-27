import React, { Component } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { connect } from "react-redux";
import Select from "react-select";
import { getUsers } from "../../actions/UsersActions";
import { DatePicker } from "antd";
import {
    deleteProject,
    editProject,
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
        this.onChangecreat = this.onChangecreat.bind(this);
        this.onChangeupdate = this.onChangeupdate.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }
    heandleChange = (selectOption) => {
        this.setState({ selectOption });
    };
    heandleChanged = (projectController) => {
        this.setState({ projectController });
    };

    componentDidMount() {
        this.props.getUsers();
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

    onEditSubmit(e) {
        e.preventDefault();
        const project = {
            projectName: this.state.projectName,
            projectCreated: this.state.projectCreat,
            projectFinished: this.state.projectFinish,
            projectManager: this.state.projectController.value,
            usersList: generateUserId(this.state.selectOption),
        };
        this.props.editProject(this.state.id, project);
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.project.id,
            projectName: newProps.project.projectName,
            projectCreat: newProps.project.projectCreated,
            projectFinish: newProps.project.projectFinished,
        });
    }

    render() {
        console.log(this.props.project);

        const { project } = this.props;

        const userListOptions = generateUser(project.usersList);
        return (
            <div className="modal" id="editProjectModal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="create-project">
                            <div className="row m-5">
                                <h4 className="loyiha-boshqaruvi">Loyihalar Boshqaruvi</h4>
                            </div>
                            <form className="m-5 w-100">
                                <div className="row w-100">
                                    <input
                                        className="projectName"
                                        name="projectName"
                                        type="text"
                                        onChange={this.onChange}
                                        placeholder="Project Name"
                                        defaultValue={this.state.projectName}
                                        required
                                    />
                                </div>
                                <Select
                                    className="w-100"
                                    onChange={this.heandleChanged}
                                    defaultValue={[
                                        {
                                            label : `${project.projectManager.firstName } ${project.projectManager.lastName}`,
                                            value : project.projectManager.id
                                        }
                                    ]}
                                    options={generateUser(this.props.users)}
                                    required
                                />
                                <DatePicker
                                    className=" w-100"
                                    name="projectCreat"
                                    value={moment(this.state.projectCreat, 'YYYY-MM-DD')}
                                    onChange={this.onChangecreat}
                                    placeholder="Created project"
                                />
                                <DatePicker
                                    className="w-100 mb-3"
                                    name="projectFinish"
                                    value={moment(this.state.projectFinish, 'YYYY-MM-DD')}
                                    onChange={this.onChangeupdate}
                                    placeholder="Finished project"
                                    aria-required
                                />
                                <Select
                                    className="mb-3 w-100"
                                    isMulti
                                    onChange={this.heandleChange}
                                    options={generateUser(this.props.users)}
                                    defaultValue={userListOptions}
                                    isRequired
                                />
                                
                                    <button
                                        className="btn btn-success pl-5 pr-5 pt-2 pb-2"
                                        type="button"
                                        data-dismiss="modal"
                                        onClick={this.onEditSubmit}
                                    >
                                        O'zgartirish
                                    </button>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    getUsers: PropTypes.func.isRequired,
    editProject: PropTypes.func.isRequired,
    deleteProject: PropTypes.func.isRequired,
    users: PropTypes.array.isRequired,
};

const mapStateToPorps = (state) => ({
    users: state.UsersReducer.users,
});

export default connect(mapStateToPorps, {
    getUsers,
    deleteProject,
    editProject,
})(Modal);
