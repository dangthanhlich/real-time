import React from 'react';
import {BrowserRouter as Router, Route , Switch} from "react-router-dom";
import Home from "./Pages/Home";
import DashBoard from "./Pages/DashBoard";

const App = () => {
  return (
    <div class="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route  path="/Dashboard">
            <DashBoard/>
          </Route>
          <Route >
            <div>Not Fond: 404</div>
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App


