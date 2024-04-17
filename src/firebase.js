import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBESugLD-L9hkUzS4GJ4Shrz3ptSI03XQE",
    authDomain: "clone-c23c7.firebaseapp.com",
    projectId: "clone-c23c7",
    storageBucket: "clone-c23c7.appspot.com",
    messagingSenderId: "432946269243",
    appId: "1:432946269243:web:3eb5d3614a04f9c800601e",
    measurementId: "G-ZW5MTS8LTD"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

export {db, auth};