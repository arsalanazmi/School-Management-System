import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";

class PrivateRoute extends Component {
  state = {
    isAuthenticated: false,
  };

  static getDerivedStateFromProps(props, state) {
    console.log("Props.isAuthenticated: ",props.isAuthenticated);
    
    if (
      props.isAuthenticated !== state.isAuthenticated
    ) {
      return { isAuthenticated: props.isAuthenticated };
    }
    return null;
  }

  render() {
    const Component = this.props.component;
    const Props = { ...this.props };
    delete Props["component"];

    console.log("Render (Component)",Component);
    console.log("Render (Props)",Props);
    console.log("this.props.location  ", this.props.location );
    
    return (
      <Route
        {...Props}
        render={(Props) => {
          return this.state.isAuthenticated ? (
            <Component {...Props} />
          ) : (
            <Redirect
              to={{
                pathname: "/Login",
                state: { from: this.props.location },
              }}
            />
          );
        }}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.any,
};

function mapStateToProps(state) {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
}

export default connect(mapStateToProps)(PrivateRoute);