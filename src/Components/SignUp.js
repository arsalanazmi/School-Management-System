import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import AuthMiddleware from "./../Store/Middleware/AuthMiddleware";

function mapStateToProps(state) {
  return {
    isRegistered: state.AuthReducer.isRegistered,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    SignUp: (credentials) => dispatch(AuthMiddleware.signup(credentials)),
  };
}

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      F_Name: "",
      L_Name: "",
      Email: "",
      Password: "",
      isRegistered: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("Sign Up getDerivedStateFromProps Props: ", props);
    console.log("Sign Up getDerivedStateFromProps State: ", state);

    if (props.isRegistered !== state.isRegistered) {
      return {
        isRegistered: props.isRegistered,
      };
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Sign Up componentDidUpdate Previous Props: ", prevProps);
    console.log("Sign Up componentDidUpdate Previous State: ", prevState);
    console.log("Sign Up ComponentDidUpdate Current Props: ", this.props);
    console.log("Sign Up ComponentDidUpdate Current State: ", this.state);

    if (prevProps !== this.props) {
      this.props.history.push("/Login");
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    
    this.props.SignUp({
      Email: this.state.Email,
      Password: this.state.Password,
    });

    this.setState({
      F_Name: "",
      L_Name: "",
      Email: "",
      Password: "",
    });
  };

  render() {
    const { F_Name, L_Name, Email, Password } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mt-3">SCHOOL MANAGEMENT SYSTEM</h1>
        <div className="row mt-5">
          <div className="Form col-9 mx-auto col-md-5">
            <h2 className="text-center">Sign Up</h2>
            <Form>
              <Form.Group controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  name="F_Name"
                  value={F_Name}
                  className="round"
                  placeholder="First Name"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  name="L_Name"
                  value={L_Name}
                  className="round"
                  placeholder="Last Name"
                  onChange={this.handleChange}
                />
              </Form.Group>

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
                Sign Up
              </Button>
              <p className="text-right mt-2">
                Already registered <a href="/Login">Sign In?</a>
              </p>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUp);