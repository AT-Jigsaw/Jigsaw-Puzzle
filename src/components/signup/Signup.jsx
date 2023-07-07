import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "./signup.css";
import { auth } from "../../auth/firebase";

const Signup = () => {
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          const user = userCredential.user;
          console.log(user);
        }
      );
    } catch (error) {
      console.log("Signup error:", error.message);
    }
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="FullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Mobile Number"
          value={email}
          onChange={(e) => setMobileNumber(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
