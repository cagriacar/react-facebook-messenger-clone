import firebase from "firebase";
// firebase bağlantısı
const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyA7PK2yFGmyQH3InkJmf0GlEAfJYjtCpqw",
  authDomain: "facebook-messenger-clone-cca02.firebaseapp.com",
  databaseURL: "https://facebook-messenger-clone-cca02.firebaseio.com",
  projectId: "facebook-messenger-clone-cca02",
  storageBucket: "facebook-messenger-clone-cca02.appspot.com",
  messagingSenderId: "1069097342784",
  appId: "1:1069097342784:web:dcafe45b391a3eaf92cca5",
  measurementId: "G-EK3LJBP6Q3",
});

const db = firebaseApp.firestore();

export default db ;
