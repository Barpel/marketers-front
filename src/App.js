import React, { Component } from 'react';
import './App.scss';

//routing
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

//state (store)
import { inject } from 'mobx-react';

//home page
import HomePage from './pages/HomePage/HomePage';

//edit or add
import MarketerEdit from './pages/MarketerEdit/MarketerEdit';

import NavBar from './components/NavBar/NavBar';


@inject('store')
class App extends Component {

  componentDidMount() {
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
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
