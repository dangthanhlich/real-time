import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";


var firebaseConfig = {
    apiKey: "AIzaSyBjD2MieZC_aPSV6Yxhr5o3_c-DUJb7-xY",
    authDomain: "real-time-cf5e7.firebaseapp.com",
    projectId: "real-time-cf5e7",
    storageBucket: "real-time-cf5e7.appspot.com",
    messagingSenderId: "19179760451",
    appId: "1:19179760451:web:d4594a927f305945a9ddf6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


export const firestore = firebase.firestore();
export const storageRef = firebase.storage().ref();
export default firebase;