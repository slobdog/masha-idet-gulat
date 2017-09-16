import * as firebase from 'firebase';

let config = {
  apiKey: "AIzaSyCPYckjBWBq7EXtB-eGKjxn79LFPPKm1Yg",
  authDomain: "masha-idet-gulat.firebaseapp.com",
  databaseURL: "https://masha-idet-gulat.firebaseio.com",
  projectId: "masha-idet-gulat",
  storageBucket: "",
  messagingSenderId: "386561801506"
};

const firebaseInst = firebase.initializeApp(config);

export default firebaseInst;
