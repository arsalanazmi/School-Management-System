import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import Home from "./Components/Home";
import PrivateRoute from "./Components/PrivateRoutes";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={SignUp} />
        <Route path="/Login" component={SignIn} />
        <PrivateRoute path="/Home" component={Home} />
      </Switch>
    </Router>
  );
};
export default Routes;