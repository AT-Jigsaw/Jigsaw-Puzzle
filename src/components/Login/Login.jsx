import React, { useState } from "react";
import "./login.css";
import Loader from "../loader/Loader";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../auth/firebase";
import { toast } from "react-toastify";
import { doc, getDoc, getFirestore } from "firebase/firestore";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async () => {
    try {
      setIsLoading(true);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      const firestore = getFirestore();
      const userDocRef = doc(firestore, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.timer > 0) {
          throw new Error("You have already solved the puzzles");
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-root">
      <Loader isLoading={isLoading} />
      <div className="login-right-root">
        <div className="login-right-root-container">
          <div />
          <div className="login-form">
            <div className="login-input-wrapper">
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#ffffff" }}
                className="login-icon"
              />
              <input
                type="email"
                placeholder="Email"
                className="login-email-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="login-input-wrapper">
              <FontAwesomeIcon
                icon={faUnlockKeyhole}
                style={{ color: "#ffffff" }}
                className="login-icon"
              />
              <input
                type="password"
                placeholder="Password"
                className="login-password-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={handleLogin}
              variant="success"
              className="login-submit"
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
