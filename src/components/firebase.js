import firebase from 'firebase'

var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDZltCAAUgRmiU9z3guPuVXJGa38PtPXZw",
    authDomain: "pandainvoice-d245c.firebaseapp.com",
    databaseURL: "https://pandainvoice-d245c-default-rtdb.firebaseio.com",
    projectId: "pandainvoice-d245c",
    storageBucket: "pandainvoice-d245c.appspot.com",
    messagingSenderId: "899815563408",
    appId: "1:899815563408:web:b956e7187e4727afedf815",
    measurementId: "G-CWVTXDNM38"
});

var db = firebaseApp.firestore();

export { db };