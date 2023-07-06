import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
// import firebase from "firebase";
import Login from "./components/Login/Login";
import Signup from "./components/signup/Signup";

// Initialize Firebase (replace with your Firebase configuration)
// const firebaseConfig = {
//   // Your Firebase config here
// };

// firebase.initializeApp(firebaseConfig);

const App = () => {
  // useEffect(() => {
  //   // Add Firebase authentication state observer
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is signed in, perform any necessary actions
  //       console.log("User is signed in:", user.email);
  //     } else {
  //       // User is signed out, perform any necessary actions
  //       console.log("User is signed out");
  //     }
  //   });
  // }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default App;
