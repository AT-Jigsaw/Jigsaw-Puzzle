import React, { useState } from "react";
import "./login.css";
import { auth } from "../../auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = (props) => {
  const { setLoginModalOpen } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => setLoginModalOpen(false))
      .catch((error) => toast.error(error));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="handleLogin">
        <input
          className="email"
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
