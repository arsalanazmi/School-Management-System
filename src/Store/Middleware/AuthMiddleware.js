import AuthAction from "./../Action/AuthAction";
import Fire from "./../../Config/Fire.js";
import LocalStorageManager from "./../../Services/LocalStorage";

export default class AuthMiddleware {
  // SIGN UP
  static signup(credentials) {
    return (dispatch) => {
      dispatch(AuthAction.signup());
      console.log("Credentials: ", credentials);

      AuthMiddleware.registerUserOnFirebase(dispatch, credentials);
    };
  }
  static registerUserOnFirebase(dispatch, credentials) {
    Fire.auth()
      .createUserWithEmailAndPassword(credentials.Email, credentials.Password)
      .then((authUser) => {
        console.log("Auth User: ", authUser);
        AuthMiddleware.createUserInFirebase(
          dispatch,
          credentials,
          authUser
        );
      })
      .catch((error) => {
        console.log("SignUp Error: ", error);
        dispatch(AuthAction.signupRejected(error));
      });
  }

  static createUserInFirebase(dispatch, credentials, authUser) {
    // user object uid ki value  authUser ki user ki value se aya jo console
    // me authUser k zariye user.uid me mil rha  hai
    let user = {
      uid: authUser.user.uid,
      Email: credentials.Email,
      Password: credentials.Password,
    };
    console.log("User: ", user);

    Fire.database()
      .ref("/")
      .child(`Users/ ${user.uid}`)
      .set(user)
      .then(() => {
        dispatch(AuthAction.signupSuccessful());
      });
  }

  // SIGN IN
  static signin(credentials) {
    console.log("Test: ", credentials);
    return (dispatch) => {
      dispatch(AuthAction.signin());
      AuthMiddleware.authenticateUserOnFirebase(dispatch, credentials);
    };
  }

  static authenticateUserOnFirebase(dispatch, credentials) {
    Fire.auth()
      .signInWithEmailAndPassword(credentials.Email, credentials.Password)
      .then(function (authUser) {
        console.log("Sign In Successfull: ", authUser);
        AuthMiddleware.getUserFromFirebase(dispatch, authUser);
      })
      .catch(function (error) {
        console.log("Sign In Error: ", error);
        dispatch(AuthAction.signinRejected(error));
      });
  }

  static getUserFromFirebase(dispatch, authUser) {
    Fire.database()
      .ref("/")
      .child(`Users/ ${authUser.user.uid}`)
      .once("value")
      .then(function (snapshot) {
        console.log("User after login: ", snapshot.val());
        LocalStorageManager.setUser(snapshot.val());
        dispatch(AuthAction.signinSuccessful(snapshot.val()));
      });
  }

  static logout() {
    return (dispatch) => {
      dispatch(AuthAction.logout());
      AuthMiddleware.logoutFromFirebase(dispatch);
    };
  }

  static logoutFromFirebase(dispatch) {
    LocalStorageManager.removeUser();
    Fire.auth()
      .signOut()
      .then(function () {
        dispatch(AuthAction.logoutSuccessful());
      })
      .catch(function (error) {
        console.log("Error in lougout ", error);
        dispatch(AuthAction.logoutSuccessful());
      });
  }
}