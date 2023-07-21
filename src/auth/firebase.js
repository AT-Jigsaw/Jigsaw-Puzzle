import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBxy5rMkLVmyZ9paSxqJSW-LPwN0yV7cOE",
  authDomain: "jigsaw-puzzle-c3302.firebaseapp.com",
  projectId: "jigsaw-puzzle-c3302",
  storageBucket: "jigsaw-puzzle-c3302.appspot.com",
  messagingSenderId: "887465593231",
  appId: "1:887465593231:web:892e6c804c0850f6f163fa"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
export default app;