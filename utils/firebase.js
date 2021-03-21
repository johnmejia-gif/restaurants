import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDiJi-HVCH_G_rJ8ubUAjQF40JslKR-xR8',
  authDomain: 'restaurants-cbbe0.firebaseapp.com',
  projectId: 'restaurants-cbbe0',
  storageBucket: 'restaurants-cbbe0.appspot.com',
  messagingSenderId: '836149756414',
  appId: '1:836149756414:web:d46470799e2a08c58480af',
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)
