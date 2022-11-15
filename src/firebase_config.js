import firebase from "firebase/compat/app";
import 'firebase/compat/database'
import 'firebase/compat/storage'
import 'firebase/compat/auth'


const firebaseConfig = {
  apiKey: "AIzaSyC5OjAlDbEPprpJjDUCnTgyZY-5uYnCzUg",
  authDomain: "auth-dev-4bf91.firebaseapp.com",
  projectId: "auth-dev-4bf91",
  storageBucket: "auth-dev-4bf91.appspot.com",
  messagingSenderId: "935990669404",
  appId: "1:935990669404:web:57e71538c5e94fc3d07699"
};


firebase.initializeApp(firebaseConfig);

export const dataRef = firebase.database();
export const storageRef = firebase.storage();
export const authRef = firebase.auth();

export default firebase;
 
