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

const token = localStorage.jwtToken;
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
            <PrivateRoute exact path="/gip-project-director/:id" component={AdminProject} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
