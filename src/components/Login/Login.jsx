import React, { useState } from "react";
import "./login.css";
import { auth } from "../../auth/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const Login = (props) => {
  const { setLoginModalOpen } = props;
  const [step, setStep] = useState(1);
  const [stepType, setStepType] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const renderStep1 = () => {
    const handleStep1Click = (stepType) => {
      setStepType(stepType);
      setStep(2);
    };
    return (
      <div>
        <button onClick={() => handleStep1Click("email")}>
          Login with email
        </button>
        <button onClick={() => handleStep1Click("phone")}>
          Login with phone
        </button>
      </div>
    );
  };

  const renderStep2 = () => {
    const handleBackClick = () => {
      setStepType("");
      setStep(1);
    };
    const handleSubmit = () => {};
    return (
      <div>
        Enter {stepType === "email" ? "Email" : "Phone Number"}
        {stepType === "email" ? (
          <>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Enter Email Address"
            />
            Enter Password
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Enter Password"
            />
          </>
        ) : (
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            placeholder="Enter Phone Number"
          />
        )}
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleBackClick}>Back</button>
      </div>
    );
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => setLoginModalOpen(false))
      .catch((error) => toast.error(error));
  };

  return (
    <div>
      <h2>Login</h2>
      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
    </div>
  );
};

export default Login;
