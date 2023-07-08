import React, { useState } from "react";
import "./signup.css";
import { auth, db } from "../../auth/firebase";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import axios from "axios";

const Signup = (props) => {
  const { setSignupModalOpen } = props;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!email || !password)
      return toast.error("Please enter both email and password");
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      const { data } = await axios.get("https://api.ipify.org?format=json");
      await setDoc(doc(db, "users", user.uid), {
        fullName: fullName,
        phoneNumber: phoneNumber,
        email: email,
        ipAddress: data.ip,
      });
      setSignupModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="signup-root">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="FullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
