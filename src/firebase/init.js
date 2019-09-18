import firebase from "firebase";
import firestore from "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyDgww34g-BXHBDD66jmR-5ctGKL8os4lj0",
  authDomain: "vue-foodies-demo.firebaseapp.com",
  databaseURL: "https://vue-foodies-demo.firebaseio.com",
  projectId: "vue-foodies-demo",
  storageBucket: "gs://vue-foodies-demo.appspot.com",
  messagingSenderId: "290952147703",
  appId: "1:290952147703:web:1e618edabe18ea76"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

export { firebaseApp };

export default firebaseApp.firestore();
