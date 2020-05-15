import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import AuthMiddleware from "../Store/Middleware/AuthMiddleware";
import StudentMiddleware from "../Store/Middleware/StudentMiddleware";
import { connect } from "react-redux";
import { v1 as uuid } from "uuid";

function mapStateToProps(state) {
  return {
    isAuthenticated: state.AuthReducer.isAuthenticated,
    StudentList: state.StudentReducer.StudentList,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => dispatch(AuthMiddleware.logout()),
    StudentRecord: (credentials) =>
      dispatch(StudentMiddleware.StudentRecord(credentials)),
    getStudentList: () => dispatch(StudentMiddleware.getStudentList()),
    StudentDelete: (StudentId) =>
      dispatch(StudentMiddleware.StudentDelete(StudentId)),
    StudentEdit: (StudentId, EditClass, EditName, EditRoll) =>
      dispatch(
        StudentMiddleware.StudentEdit(StudentId, EditClass, EditName, EditRoll)
      ),
  };
}

class Home extends Component {
  constructor() {
    super();

    this.state = {
      Student_Name: "",
      Student_Roll: "",
      Student_Class: "",
      Edit: false,
      Id: "",
      index: "",
      StudentList: [],
      isAuthenticated: true,
    };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps Props: ", props);
    console.log("getDerivedStateFromProps State: ", state);

    if (
      state.isAuthenticated !== props.isAuthenticated ||
      state.StudentList !== props.StudentList
    ) {
      return {
        isAuthenticated: props.isAuthenticated,
        StudentList: props.StudentList,
      };
    }
    return null;
  }

  componentDidMount() {
    console.log("componentDidMount props", this.props);
    console.log("componentDidMount state", this.state);
    this.props.getStudentList();
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    // If any field is empty do not submit the Form.
    if (
      this.state.Student_Name === "" ||
      this.state.Student_Class === "" ||
      this.state.Student_Roll === ""
    ) {
      return;
    }

    let StudentList = this.state.StudentList;
    let Name = this.state.Student_Name;
    let Class = this.state.Student_Class;
    let Roll = this.state.Student_Roll;

    if (this.state.Edit === false) {
      // Add New Data
      this.props.StudentRecord({
        id: uuid(),
        Name: this.state.Student_Name,
        Class: this.state.Student_Class,
        Roll: this.state.Student_Roll,
      });
    } else {
      // Add Edit data
      let index = this.state.index;
      let Id = this.state.Id;
      StudentList[index].Name = Name;
      StudentList[index].Class = Class;
      StudentList[index].Roll = Roll;

      this.props.StudentEdit(
        Id,
        (StudentList[index].Name = Name),
        (StudentList[index].Class = Class),
        (StudentList[index].Roll = Roll)
      );
    }

    this.setState({
      StudentList: this.state.StudentList,
      Edit: false,
      Student_Name: "",
      Student_Roll: "",
      Student_Class: "",
    });
  };

  handleEdit = (id, i) => {
    const data = this.state.StudentList[i];

    this.setState({
      Id: id,
      Edit: true,
      index: i,
      Student_Name: data.Name,
      Student_Class: data.Class,
      Student_Roll: data.Roll,
    });
  };

  handleDelete = (id, i) => {
    console.log("Delete Id: ", id);
    this.props.StudentDelete(id);

    var StudentList1 = this.state.StudentList;
    StudentList1.splice(i, 1);
    this.setState({
      StudentList: StudentList1,
    });
  };

  handleSignout = () => {
    this.props.logout();
  };

  render() {
    const {
      Student_Name,
      Student_Class,
      Student_Roll,
      StudentList,
    } = this.state;
    return (
      <div className="container">
        <h1 className="text-center mt-3">SCHOOL MANAGEMENT SYSTEM</h1>
        <div className="row mt-5">
          <div className="form col-9 mx-auto col-md-5">
            <h2 className="text-center">Student Input</h2>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="Student_Name"
                  value={Student_Name}
                  className="round"
                  onChange={this.handleChange}
                  placeholder="Student Name"
                />
              </Form.Group>

              <Form.Group controlId="formBasicClass">
                <Form.Label>Class</Form.Label>
                <Form.Control
                  type="text"
                  name="Student_Class"
                  value={Student_Class}
                  className="round"
                  onChange={this.handleChange}
                  placeholder="Student Class"
                />
              </Form.Group>

              <Form.Group controlId="formBasicRoll">
                <Form.Label>Roll No.</Form.Label>
                <Form.Control
                  type="text"
                  name="Student_Roll"
                  value={Student_Roll}
                  className="round"
                  onChange={this.handleChange}
                  placeholder="Student Roll No."
                />
              </Form.Group>

              {this.state.Edit === false ? (
                <Button
                  type="submit"
                  onClick={this.handleSubmit}
                  className="btn btn-primary round submit"
                >
                  Add
                </Button>
              ) : (
                <Button
                  type="submit"
                  onClick={this.handleSubmit}
                  className="btn btn-success round update"
                >
                  Update
                </Button>
              )}
            </Form>
          </div>
        </div>

        <div className="row">
          <h2 className="text-center mx-auto mt-4 mb-3">Student Data</h2>
          <div className="table-responsive mx-auto">
            <table className="w-100 text-center col-6 mx-auto col-md-10 table table-bordered table-hover table-dark table-striped">
              <thead>
                <tr>
                  <th className="serial_no">S.No</th>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Class</th>
                  <th>Roll. No.</th>
                  <th> Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              {StudentList.map((data, i) => {
                return (
                  <tbody key={i}>
                    <tr>
                      <td className="serial_no">{i + 1}.</td>
                      <td>{data.id}</td>
                      <td>{data.Name}</td>
                      <td>{data.Class}</td>
                      <td>{data.Roll}</td>
                      <td>
                        <Button
                          onClick={() => this.handleEdit(data.id, i)}
                          className="btn btn-info edit"
                        >
                          Edit
                        </Button>
                      </td>
                      <td className="delete_button">
                        <Button
                          onClick={() => this.handleDelete(data.id, i)}
                          className="btn btn-danger delete"
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
        {this.state.isAuthenticated && (
          <Button
            className="btn w-50 logout delete round btn-danger my-5"
            onClick={this.handleSignout}
          >
            Log Out
          </Button>
        )}
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);