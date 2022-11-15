import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyC5OjAlDbEPprpJjDUCnTgyZY-5uYnCzUg",
  authDomain: "auth-dev-4bf91.firebaseapp.com",
  projectId: "auth-dev-4bf91",
  storageBucket: "auth-dev-4bf91.appspot.com",
  messagingSenderId: "935990669404",
  appId: "1:935990669404:web:57e71538c5e94fc3d07699"
})

export const auth = app.auth()
export default app
