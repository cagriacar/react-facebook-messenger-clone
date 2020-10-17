import firebase from "firebase";
// firebase bağlantısı
const firebaseApp = firebase.initializeApp({
});

const db = firebaseApp.firestore();

export default db ;
