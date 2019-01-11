import React, { Component } from 'react';
import './App.scss';

//routing
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faExternalLinkAlt, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

//state (store)
import { inject } from 'mobx-react';

//home page
import HomePage from './pages/HomePage/HomePage';

//edit or add marketer
import MarketerEdit from './pages/MarketerEdit/MarketerEdit';

//app navigation bar
import NavBar from './components/NavBar/NavBar';

//login page
import AdminLogin from './pages/AdminLogin/AdminLogin';

//admin page
import AdminPage from './pages/AdminPage/AdminPage';

//private route for admins
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

import { observable } from 'mobx';

library.add(fab, faExternalLinkAlt, faTimesCircle)

@inject('store')
class App extends Component {

  adminStore = this.props.store.adminStore;

  @observable
  isAdminLogged = this.adminStore.isAdminLogged;

  componentDidMount() {
  }

  renderLogin = props => {
    return <AdminLogin {...props} />;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar></NavBar>
          <Switch>
            <Route exact path="/"
              component={HomePage} />
            <Route path="/marketer/register"
              component={MarketerEdit} />
            <PrivateRoute store={this.adminStore} path="/admin" component={AdminPage} />
            <Route path="/login"
              render={this.renderLogin} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
