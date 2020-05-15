import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import AuthMiddleware from "./../Store/Middleware/AuthMiddleware";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    signin: (credentials) => dispatch(AuthMiddleware.signin(credentials)),
  };
}

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: "",
      Password: "",
      isAuthenticated: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("Sign In getDerivedStateFromProps State: ", state);
    console.log("Sign In getDerivedStateFromProps Props:", props);

    if (props.isAuthenticated !== state.isAuthenticated) {
      return {
        isAuthenticated: props.isAuthenticated,
      };
    }
    return null;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    this.props.signin({
      Email: this.state.Email,
      Password: this.state.Password,
    });

    this.setState({
      Email: "",
      Password: "",
    });
  };

  render() {
    const { from } = this.props.location.state ||  {from:{pathname: '/Home'} }
   
    console.log("SignIn Render (this.props.location.state): ", this.props.location.state);
    console.log("SignIn Render (this.props.location): ", this.props.location);
    console.log("{from:{pathname: '/Home'} }", { from: { pathname: "/Home" } });

    if (this.state.isAuthenticated) {
      return <Redirect to={from} />;
    }

    const { Email, Password } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mt-3">SCHOOL MANAGEMENT SYSTEM</h1>
        <div className="mt-5">
          <div className="Form col-9 mx-auto col-md-5">
            <h2 className="text-center">Sign In</h2>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="Email"
                  value={Email}
                  className="round"
                  placeholder="Enter Email"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="Password"
                  value={Password}
                  className="round"
                  placeholder="Enter Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                type="submit"
                onClick={this.handleSubmit}
                className="btn btn-success round submit btn-block"
              >
                Sign In
              </Button>
              <p className="text-right mt-2">
                Create new Account <a href="/">Sign Up</a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);