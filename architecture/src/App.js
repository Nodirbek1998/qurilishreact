import React, { Component } from 'react';
import Login from './components/pages/Login';
import { BrowserRouter, Route, Switch} from "react-router-dom";
import { Provider } from 'react-redux';
import "antd/dist/antd.css";
import "./components/pages/Login.css";
import Register from './components/pages/Register';
import Derictor from './components/pages/Derictor';
import store from './store';
import setJWToken from "./utils/setJwtToken";
import { GET_TOKEN } from "./actions/Types";
import jwt_decode from 'jwt-decode';
import PrivateRoute from "./common/PrivateRoute";
import Admin from './components/pages/Admin';
import Users from './components/pages/Users';
import UserPanel  from './components/pages/UserPanel';
import GIPprojectManager from './components/pages/GIPManagerProject';
import GIPproject from './components/pages/GIPProject';
import AllProject from './components/pages/AllProject';
import AdminProject from './components/pages/AdminProject';
import Manager from './components/pages/Manager';
import ActiveProject from './components/pages/ActiveProjects';
import FinishedProject from './components/pages/FinishedProject';
import InProgressProject from './components/pages/InProgressProject';

import ProjectManager  from 'components/pages/ProjectManager';

const token = localStorage.getItem('jwtToken');
if (token) {
  setJWToken(token);
  const decoded = jwt_decode(token)
  store.dispatch({
    type: GET_TOKEN,
    payload: decoded,
  });
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          {/* <PersistGate persistor={persistor}> */}
            <Route exact path="/" component={Login} />
            <Switch>
              <PrivateRoute exact path="/register" component={Register} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/derictor" component={Derictor} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/admin" component={Admin} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/users" component={Users} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/project/:id" component={UserPanel} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/gip-project-manager/:id" component={GIPprojectManager} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/gipProject" component={GIPproject} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/allProject" component={AllProject} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/manager" component={Manager} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/gip-project-director/:id" component={AdminProject} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/manager-project/:id" component={ProjectManager} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/active-project" component={ActiveProject} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/finished-project" component={FinishedProject} />
            </Switch>
            <Switch>
              <PrivateRoute exact path="/inProgress-project" component={InProgressProject} />
            </Switch>
          {/* </PersistGate> */}
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
