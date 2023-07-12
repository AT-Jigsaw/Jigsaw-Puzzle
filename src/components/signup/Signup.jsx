import React, { useState } from "react";
import "./signup.css";
import Loader from "../loader/Loader";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUnlockKeyhole, faUser } from "@fortawesome/free-solid-svg-icons";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../auth/firebase";
import axios from "axios";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Signup = (props) => {
  const { setSignupModalOpen, setLoginModalOpen } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignup = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get("https://api.ipify.org?format=json");
      const q = query(
        collection(db, "users"),
        where("ipAddress", "==", data.ip)
      );
      const userSnap = await getDocs(q);
      if (userSnap.size) {
        setSignupModalOpen(true);
        return toast.error("You have already signed up from this IP address.");
      }
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user.uid), {
        email: email,
        ipAddress: data.ip,
      });
      setSignupModalOpen(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const handleLoginClick = () => {
    setLoginModalOpen(true);
    setSignupModalOpen(false);
  };
  return (
    <div className="signup-root">
      <Loader isLoading={isLoading} />
      <div className="signup-left-root">
        <div className="signup-left-text">Signup</div>
      </div>
      <div className="signup-right-root">
        <div className="signup-right-root-container">
          <div />
          <div className="signup-form">
            <div className="signup-input-wrapper">
              <FontAwesomeIcon
                icon={faUser}
                style={{ color: "#ffffff" }}
                className="signup-icon"
              />
              <input
                type="email"
                placeholder="Email"
                className="signup-email-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="signup-input-wrapper">
              <FontAwesomeIcon
                icon={faUnlockKeyhole}
                style={{ color: "#ffffff" }}
                className="signup-icon"
              />
              <input
                type="password"
                placeholder="Password"
                className="signup-password-input"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSignup}
              variant="success"
              className="signup-submit"
            >
              Signup
            </Button>
          </div>
          <div className="signup-goto-signup">
            <div>Existing User?</div>
            <Button variant="link" onClick={handleLoginClick}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
