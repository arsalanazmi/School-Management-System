import StudentAction from "./../Action/StudentAction";
import Fire from "./../../Config/Fire.js";

export default class StudentMiddleware {
  static StudentRecord(credentials) {
    return (dispatch) => {
      dispatch(StudentAction.StudentRecord());
      console.log("Credentials: ", credentials);
      StudentMiddleware.registerStudentRecordOnFirebase(dispatch, credentials);
    };
  }

  static registerStudentRecordOnFirebase(dispatch, credentials) {
    let Student = {
      id: credentials.id,
      Name: credentials.Name,
      Class: credentials.Class,
      Roll: credentials.Roll,
    };
    console.log("Student: ",Student);
    
    Fire.database()
      .ref("/")
      .child(`Students/ ${credentials.id}`)
      .set(Student)
      .then(function () {
        dispatch(StudentAction.registerStudentSuccessful());
      });
  }

  static getStudentList() {
    return (dispatch) => {
      dispatch(StudentAction.getStudentList());
      StudentMiddleware.getStudentListFromFirebase(dispatch);
    };
  }

  static getStudentListFromFirebase(dispatch) {
    const StudentListRef = Fire.database()
      .ref("/")
      .child("Students")
      .orderByChild("id");
    StudentListRef.on("child_added", function (snapshot) {
      console.log("Snapshot: ", snapshot.val());
      dispatch(StudentAction.addStudentToList(snapshot.val()));
    });
  }

  static StudentDelete(StudentId) {
    return (dispatch) => {
      var DeleteRef = Fire.database().ref(`/Students/ ${StudentId}`);
      DeleteRef.remove()
        .then(function () {
          dispatch(StudentAction.StudentDeleteSuccessfull());
          console.log("Remove succeeded.");
        })
        .catch(function (error) {
          console.log("Remove failed: " + error.message);
        });
    };
  }

  static StudentEdit(StudentId,EditClass,EditName,EditRoll) {
    return (dispatch) => {
      var EditRef = Fire.database().ref(`/Students/ ${StudentId}`);
      EditRef
        .update({Class:EditClass,Name:EditName,Roll:EditRoll})
        .then(() => {

          dispatch(StudentAction.StudentUpdateSuccessfully());
          console.log("Update Successfully");
        })
        .catch((error) => {
          console.log("Update Failed: ", error.message);
        });
    };
  }
}