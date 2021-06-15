import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import 'firebase/storage';

const FireBaseConfig = {
  apiKey: "AIzaSyCsDpxXrvqmn48eyk0EcuG2TomUCKizZv0",
  authDomain: "orbital-5e32e.firebaseapp.com",
  databaseURL: "https://orbital-5e32e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "orbital-5e32e",
  storageBucket: "orbital-5e32e.appspot.com",
  messagingSenderId: "353085307526",
  appId: "1:353085307526:web:80a3a2bed69cb592a0ef07",
  measurementId: "G-JCZD4RDW8G"
};

firebase.initializeApp(FireBaseConfig);

export default firebase;