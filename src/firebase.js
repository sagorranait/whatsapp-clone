import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyDod-QaLshL4lsoLUEQPwgim8vwCHoEcSA",
  authDomain: "whatsapp-clone-f8e45.firebaseapp.com",
  projectId: "whatsapp-clone-f8e45",
  storageBucket: "whatsapp-clone-f8e45.appspot.com",
  messagingSenderId: "1040652650819",
  appId: "1:1040652650819:web:02d28c8b24281a41c2c7f6",
  measurementId: "G-VJMD7H09NY"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()
const provider = new firebase.auth.GoogleAuthProvider()

export {auth, provider}
export default db