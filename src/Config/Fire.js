import firebase from "firebase"

var config = {
    apiKey: "AIzaSyD-ahVNaZ-Rc_3EKEXSDjvNcvwlATscJac",
    authDomain: "school-management-system-19fb4.firebaseapp.com",
    databaseURL: "https://school-management-system-19fb4.firebaseio.com",
    projectId: "school-management-system-19fb4",
    storageBucket: "school-management-system-19fb4.appspot.com",
    messagingSenderId: "224395690068",
    appId: "1:224395690068:web:59865d5a367286e739adc1",
    measurementId: "G-49QJR53GC0"
  };
  // Initialize Firebase
const fire = firebase.initializeApp(config);
export default fire;